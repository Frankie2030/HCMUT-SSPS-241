import cron from "node-cron";
import Log from "./models/printingLogModel.js";
import Printer from "./models/printerModel.js";

async function start() {
  cron.schedule("* * * * *", async function () {
    console.log("Running...");
    const now = new Date();
    try {
      const logs = await Log.find({
        schedule: { $lte: now },
        status: { $nin: ['cancelled', 'completed'] }
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
  });
}

export { start };
