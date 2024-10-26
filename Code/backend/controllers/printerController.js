import Printer from "../models/printerModel.js"

const createPrinter = async (req, res) => {
  const printer = new Printer(req.body);
  try {
    await printer.save();
    res.status(201).send(printer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPrinters = async (req, res) => {
  try {
    const printers = await Printer.find({});
    res.json(printers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPrinter = async (req, res) => {
  try {
    const printer = await Printer.findById(req.params.id);
    if (!printer) {
      return res.status(404).send();
    }
    res.send(printer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePrinter = async (req, res) => {
  try {
    const printer = await Printer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!printer) {
      return res.status(404).send();
    }
    res.send(printer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePrinter = async (req, res) => {
  try {
    console.log(req.params.id);
    const printer = await Printer.findByIdAndDelete(req.params.id);
    
    if (!printer) {
      return res.status(404).send();
    }
    res.send(printer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const setStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log(id);

  if (!["enabled", "disabled"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const printer = await Printer.findById(id);
    if (!printer) {
      return res.status(404).json({ error: "Printer not found" });
    }

    printer.status = status;
    await printer.save();

    res.json({ message: "Status updated successfully", printer });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the status" });
  }
};

export { createPrinter, getPrinters, getPrinter, updatePrinter, deletePrinter, setStatus };
