import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// Import all models
import Printer from "./models/printerModel.js";
import Configuration from "./models/configModel.js";
import File from "./models/fileModel.js";
import User from "./models/userModel.js";
import BuyingLog from "./models/buyingLogModel.js";
import PrintingLog from "./models/printingLogModel.js";
// import Stats from "./models/statsModel.js";

// Import any other models you might have
import printers from "./data/printerData.js";
import config from "./data/configData.js";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Printer.deleteMany();
    await Configuration.deleteMany();

    await Printer.insertMany(printers);
    await Configuration.insertMany(config);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete data from all models
    await Printer.deleteMany();
    await Configuration.deleteMany();
    await File.deleteMany();
    await User.deleteMany();
    await BuyingLog.deleteMany();
    await PrintingLog.deleteMany();
    // await Stats.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
