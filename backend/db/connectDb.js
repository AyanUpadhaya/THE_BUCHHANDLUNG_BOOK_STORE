const mongoose = require("mongoose");
const connection_string = process.env.MOGO_URI;
const { logError, logInfo } = require("../utils/loggers");
const connectDb = async () => {
  try {
    await mongoose.connect(connection_string);
    logInfo("Database connected successfully");
  } catch (error) {
    logError("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
