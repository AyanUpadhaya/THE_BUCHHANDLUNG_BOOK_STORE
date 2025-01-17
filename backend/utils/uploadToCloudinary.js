const cloudinary = require("../config/cloudinary.config");
const { logInfo, logError } = require("./loggers");
const getDataUri = require("./datauri");

const uploadToCloudinary = async (req) => {
  if (!req.files || !req.files.file || req.files.file.length === 0) {
    throw new Error("No file uploaded");
  }
  const fileName = req.files.file[0].filename;
  try {
    const file = req.files.file[0];
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    logInfo("Upload successful",{cloudResponse});
    const finalOuput = cloudResponse.secure_url;
    return [finalOuput, fileName];
  } catch (error) {
    logError("Failed to upload cloudinary", error);
  }
};

module.exports = uploadToCloudinary;
