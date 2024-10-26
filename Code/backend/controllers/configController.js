import Configuration from "../models/configModel.js";

const getTypes = async (req, res) => {
  const config = await Configuration.findOne();
  console.log(config);
  res.json(config.permittedFileType);
};

const addType = async (req, res) => {
  const fileType = req.body.fileType;
  const config = await Configuration.findOne();
  if (!config.permittedFileType.includes(fileType)) {
    await Configuration.updateOne(
      {},
      { $push: { permittedFileType: fileType } }
    );
    res.json({ message: "File type added successfully." });
  } else {
    res.json({ message: "File type already exists." });
  }
};

const deleteType = async (req, res) => {
  const fileType = req.body.fileType;
  await Configuration.updateOne({}, { $pull: { permittedFileType: fileType } });
  res.json({ message: "File type deleted successfully." });
};

const getDefaults = async (req, res) => {
  const config = await Configuration.findOne();
  res.json({
    defaultPages: config.defaultPages,
    distributionDates: config.distributionDates,
  });
};

const updateDefaults = async (req, res) => {
  console.log(req.body);
  const { defaultPages, distributionDates } = req.body;
  await Configuration.findOneAndUpdate(
    {},
    { defaultPages, distributionDates },
    { upsert: true }
  );
  res.json({ message: "Defaults updated successfully." });
};

export { getTypes, addType, deleteType, getDefaults, updateDefaults };
