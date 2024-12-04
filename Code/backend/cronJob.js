import cron from "node-cron";
import Log from "./models/printingLogModel.js";
import Printer from "./models/printerModel.js";
import Configuration from "./models/configModel.js"; // Import configuration model
import User from "./models/userModel.js"; // Import user model
import printers_balancing from "./data/printerData-loadbalancing.js"; // Import load-balancing printers

function convertToTimeZone(date, timeZone) {
  return new Date(date.toLocaleString("en-US", { timeZone: timeZone }));
}

async function start() {
  console.log("Cron job started...");

  const timeZone = "Asia/Ho_Chi_Minh"; // Desired time zone

  cron.schedule("* * * * *", async function () {
    console.log("Running scheduled tasks...");

    const now = new Date(); // Current time in UTC
    const localNow = convertToTimeZone(now, timeZone); // Convert to local time using time zone

    console.log("Current Time (UTC):", now.toISOString());
    console.log("Current Time (Local):", localNow.toISOString());

    // Task 1: Add load-balancing printers during peak hours
    let peakHoursStart = new Date();
    peakHoursStart.setHours(15, 44, 0); // Set peak hours start time (12:00 PM local time)
    peakHoursStart = convertToTimeZone(peakHoursStart, timeZone);

    let peakHoursEnd = new Date(peakHoursStart.getTime() + 1 * 60 * 1000);
    peakHoursEnd = convertToTimeZone(peakHoursEnd, timeZone);

    console.log("Current Time:", localNow);
    console.log("Peak Hours Window:", {
      start: peakHoursStart.toISOString(),
      end: peakHoursEnd.toISOString(),
    });

    try {
      if (localNow >= peakHoursStart && localNow < peakHoursEnd) {
        console.log("Peak hours active: Adding load-balancing printers...");
        for (const printer of printers_balancing) {
          // Check if the printer already exists in the database
          const existingPrinter = await Printer.findOne({
            number: printer.number,
          });
          if (!existingPrinter) {
            // Add printer with "restricted" property for disabling configurations
            await Printer.create({
              ...printer,
              restricted: true, // Flag to mark as load-balancing printer
            });
            // console.log(`Added printer: ${printer.number}`);
          }
        }
      }

      // Task 2: Remove load-balancing printers after peak hours
      if (localNow >= peakHoursEnd) {
        // console.log("Peak hours ended: Removing load-balancing printers...");
        const result = await Printer.deleteMany({ restricted: true });
        console.log(`Removed ${result.deletedCount} load-balancing printers.`);
      }
    } catch (err) {
      console.error("Error managing load-balancing printers:", err);
    }

    // Task 3: Process Printing Logs
    try {
      const logs = await Log.find({
        schedule: { $lte: now },
        status: { $nin: ["cancelled", "completed"] },
      });

      for (const log of logs) {
        log.status = "completed";
        await log.save();
        console.log(`Updated log ${log._id}`);

        const printer = await Printer.findById(log.printerId);
        if (!printer) {
          console.log(`Printer not found for log ${log._id}`);
          continue;
        }

        printer.queue = Math.max(0, printer.queue - 1);
        await printer.save();
        console.log(`Decreased queue for printer ${printer._id}`);
      }
    } catch (err) {
      console.error("Error updating log or printer:", err);
    }

    // Task 4: Add Default Pages to Users at Distribution Date
    try {
      const config = await Configuration.findOne();
      const timeZone = "Asia/Ho_Chi_Minh";
      if (config && config.distributionDates) {
        const distributionTime = convertToTimeZone(
          new Date(config.distributionDates),
          timeZone
        ); // Stored in UTC

        console.log(
          "Configured Distribution Time (UTC):",
          distributionTime.toISOString()
        );

        // distributionTime = convertToTimeZone(distributionTime, timeZone);
        // console.log(
        //   "Configured Distribution Time (UTC):",
        //   distributionTime.toISOString()
        // );

        // Define 1-minute margin for comparison in local time zone
        const startMargin = new Date(distributionTime);
        const endMargin = new Date(distributionTime.getTime() + 60000);

        console.log(`Local now ${localNow.toISOString()}`);
        console.log(
          `Margin Window (Local): Start=${startMargin.toISOString()}, End=${endMargin.toISOString()}`
        );

        // const date = new Date(); // Current date and time

        // const vietnamTime = convertToTimeZone(date, timeZone);

        // console.log("Original Date (UTC):", date.toISOString());
        // console.log("Vietnam Time:", vietnamTime.toISOString());
        // console.log("Vietnam Time (Readable):", vietnamTime.toString());

        // Compare in the local time zone
        if (localNow >= startMargin && localNow < endMargin) {
          console.log("It's time to distribute pages!");

          // Add defaultPages to all users' pageBalance
          const result = await User.updateMany(
            {},
            { $inc: { pageBalance: config.defaultPages } }
          );
          console.log("UpdateMany result:", result);

          console.log(
            `Added ${config.defaultPages} pages to all users' pageBalance.`
          );

          // Reset distributionDates to avoid multiple executions
          // await Configuration.updateOne({}, { distributionDates: null });
          // console.log("Reset distributionDates to null.");
        } else {
          console.log("Not time to distribute pages yet.");
        }
      } else {
        console.log("No distributionDates configured or config is null.");
      }
    } catch (err) {
      console.error("Error distributing pages:", err);
    }
  });
}

export { start };
