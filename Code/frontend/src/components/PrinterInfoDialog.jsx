import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { useUpdatePrinterMutation } from "../slices/printerApiSlice";

const PrinterInfoDialog = ({ open, handleOpen, printer }) => {
  // Temporary form state for changes
  const [tempFormValues, setTempFormValues] = useState({
    brand: printer.brand,
    location: `${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`,
    number: printer.number,
    description: printer.description,
  });

  const [updatePrinter] = useUpdatePrinterMutation();

  // Reset tempFormValues to the current printer's info whenever the dialog is opened
  useEffect(() => {
    if (open) {
      setTempFormValues({
        brand: printer.brand,
        location: `${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`,
        number: printer.number,
        description: printer.description,
      });
    }
  }, [open, printer]);

  const handleChange = (e) => {
    setTempFormValues({
      ...tempFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setTempFormValues({
      ...tempFormValues,
      brand: selectedOption,
    });
  };

  const handleSave = async () => {
    const [campus, building, room] = tempFormValues.location.split(" - ");
    await updatePrinter({
      id: printer._id,
      brand: tempFormValues.brand,
      location: { campus, building, room },
      number: tempFormValues.number,
      description: tempFormValues.description,
    });
    handleOpen(); // Close the dialog
    window.location.reload(); // Reload the page
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Printer Information</DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          <Select
            label="Brand"
            value={tempFormValues.brand}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <Option value="Canon">Canon</Option>
            <Option value="HP">HP</Option>
            <Option value="Epson">Epson</Option>
            <Option value="Brother">Brother</Option>
            <Option value="Fuji Xerox">Fuji Xerox</Option>
            <Option value="Samsung">Samsung</Option>
            <Option value="Panasonic">Panasonic</Option>
          </Select>

          <Input
            label="Location (Campus - Building - Room)"
            name="location"
            value={tempFormValues.location}
            onChange={handleChange}
            placeholder="Enter the Location (e.g., Campus-Building-Room)"
          />

          <Input
            label="Printer ID"
            name="number"
            value={tempFormValues.number}
            onChange={handleChange}
            placeholder="Enter Printer ID"
          />

          <Input
            label="Description"
            name="description"
            value={tempFormValues.description}
            onChange={handleChange}
            placeholder="Enter a description"
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="blue" onClick={handleSave}>
          Save
        </Button>
        <Button color="blue-gray" onClick={handleOpen}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PrinterInfoDialog;
