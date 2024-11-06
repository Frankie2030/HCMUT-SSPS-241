import File from "../models/fileModel.js";
import StoreFile from "../models/storeFileModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Configuration from "../models/configModel.js";

const createFile = async (req, res) => {
  try {
    const config = await Configuration.findOne();
    const fileType = req.body.type;

    if (!config.permittedFileType.includes(fileType)) {
      console.log("File type not permitted:", fileType);
      return res.status(400).json({ error: "File type not permitted." });
    }

    const file = new File(req.body);
    await file.save();

    console.log("File created successfully with ID:", file._id);
    res.status(201).json({ fileId: file._id });
  } catch (error) {
    console.error("Error in createFile:", error);
    res.status(400).json({ error: "Failed to create file" });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find({});
    files.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));
    res.send(files);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send();
    }
    res.send(file);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!file) {
      return res.status(404).send();
    }
    res.send(file);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).send();
    }
    res.send(file);
  } catch (error) {
    res.status(500).send(error);
  }
};

const storeFile = async (req, res) => {
  try {
    console.log("Received req.body in storeFile:", req.body); // Debugging

    const { _id: fileId } = req.body;

    // Validate fileId
    if (!fileId) {
      return res.status(400).send({ error: "Invalid fileId" });
    }

    const uploadedFiles = [];

    // Loop through each file in req.files
    for (const file of req.files) {
      const { originalname: name, filename } = file;

      let existingFile = await StoreFile.findOne({ fileId, path: filename });
      if (!existingFile) {
        const storedFile = new StoreFile({ name, path: filename, fileId });
        await storedFile.save();
        uploadedFiles.push(storedFile);
      }
    }

    res.status(201).send(uploadedFiles); // Send all uploaded files' data
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getStoredFile = async (req, res) => {
  try {
    const file = await StoreFile.findOne({ fileId: req.params.id });
    if (!file) {
      return res.status(404).send("File not found in database.");
    }

    const filePath = path.join(
      dirname(fileURLToPath(import.meta.url)),
      "uploads",
      file.path
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found on disk.");
    }

    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getFilesByUser = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id });
    files.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));
    res.send(files);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  createFile,
  getFiles,
  getFile,
  updateFile,
  deleteFile,
  storeFile,
  getStoredFile,
  getFilesByUser,
};
