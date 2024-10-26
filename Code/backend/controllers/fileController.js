import File from "../models/fileModel.js";
import StoreFile from "../models/storeFileModel.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Configuration from "../models/configModel.js";

const createFile = async (req, res) => {
  const config = await Configuration.findOne(); 
  const fileType = req.body.type; 

  if (!config.permittedFileType.includes(fileType)) {
    return res.status(400).send({ error: 'File type not permitted.' });
  }

  const file = new File(req.body);
  try {
    await file.save();
    res.status(201).send(file._id);
  } catch (error) {
    res.status(400).send(error);
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
    const file = await File.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
    const { originalname: name, filename: path} = req.file;
    const { _id: fileId} = req.body;
    let file = await StoreFile.find({fileId: fileId});
    console.log(file);
    if (file.length === 0) {
      file = new StoreFile({ name, path, fileId });
      await file.save();
    }
    res.status(201).send(file);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

const getStoredFile = async (req, res) => {
  try {
    const file = await StoreFile.find({fileId: req.params.id});
    if (file.length === 0) {
      return res.status(404).send();
    }
    const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'uploads', file[0].path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send();
    }

    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getFilesByUser = async (req, res) => {
  try {
    const files = await File.find({userId: req.user._id});
    files.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));
    res.send(files);
  } catch (error) {
    res.status(500).send(error);
  }
}

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
