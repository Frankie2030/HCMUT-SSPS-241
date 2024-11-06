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
  Alert,
} from "@material-tailwind/react";
import { useUpdatePrinterMutation } from "../slices/printerApiSlice";
import { useSelector } from "react-redux";

const PrinterInfoDialog = ({ open, handleOpen, printer }) => {
  const [tempFormValues, setTempFormValues] = useState({
    brand: printer.brand,
    location: `${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`,
    number: printer.number,
    description: printer.description,
  });

  const [updatePrinter] = useUpdatePrinterMutation();
  const [showAlert, setShowAlert] = useState(false);

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
    try {
      await updatePrinter({
        id: printer._id,
        brand: tempFormValues.brand,
        location: { campus, building, room },
        number: tempFormValues.number,
        description: tempFormValues.description,
      });
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Failed to update printer:", error);
    }
  };

  const { role } = useSelector((state) => state.auth.userData);
  const isCustomer = role === "customer";

  return (
    <>
      {showAlert && (
        <Alert
          color="green"
          className="fixed left-1/2 top-4 z-50 w-[90%] max-w-[400px] -translate-x-1/2 transform sm:w-[30%]"
        >
          Printer updated successfully!
        </Alert>
      )}

      <Dialog
        open={open}
        handler={handleOpen}
        className="mx-auto w-full max-w-md"
      >
        <DialogHeader>Printer Information</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Select
              label="Brand"
              value={tempFormValues.brand}
              onChange={(e) => handleSelectChange(e.target.value)}
              className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              disabled={isCustomer}
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
              disabled={isCustomer}
              className="text-sm sm:text-base"
            />

            <Input
              label="Printer ID"
              name="number"
              value={tempFormValues.number}
              onChange={handleChange}
              placeholder="Enter Printer ID"
              disabled={isCustomer}
              className="text-sm sm:text-base"
            />

            <Input
              label="Description"
              name="description"
              value={tempFormValues.description}
              onChange={handleChange}
              placeholder="Enter a description"
              disabled={isCustomer}
              className="text-sm sm:text-base"
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          {!isCustomer && (
            <Button
              color="blue"
              onClick={handleSave}
              className="w-full sm:w-auto"
            >
              Save
            </Button>
          )}
          <Button
            color="blue-gray"
            onClick={handleOpen}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PrinterInfoDialog;
