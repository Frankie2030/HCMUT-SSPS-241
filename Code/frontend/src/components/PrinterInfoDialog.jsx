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
import { useSelector } from "react-redux";
import {
  useGetPrinterQuery,
  useUpdatePrinterDetailsMutation, // Corrected import
} from "../slices/printerApiSlice";
import { useUpdateFilePrinterMutation } from "../slices/fileApiSlice";

const PrinterInfoDialog = ({ open, handleOpen, printer, fileId }) => {
  const { data: printers, isLoading } = useGetPrinterQuery();
  const [tempFormValues, setTempFormValues] = useState({
    brand: printer.brand || "",
    location: printer.location
      ? `${printer.location.campus || ""} - ${printer.location.building || ""} - ${printer.location.room || ""}`
      : "",
    number: printer.number || "",
    description: printer.description || "",
  });
  const [selectedPrinterId, setSelectedPrinterId] = useState(printer._id);
  const [updateFilePrinter] = useUpdateFilePrinterMutation();
  const [updatePrinterDetails] = useUpdatePrinterDetailsMutation();
  // const [showAlert, setShowAlert] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", color: "" }); // New alert state

  const { role } = useSelector((state) => state.auth.userData);
  const isCustomer = role === "customer";
  const isSPSO = role === "SPSO"; // Check if user is SPSO

  const filteredPrinters = printers?.filter((p) => p.status === "enabled");

  useEffect(() => {
    if (open) {
      setTempFormValues({
        brand: printer.brand,
        location: `${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`,
        number: printer.number,
        description: printer.description,
      });
      setSelectedPrinterId(printer._id);
    }
  }, [open, printer]);

  const handleFilePrinterChange = async () => {
    console.log("Selected Printer ID:", selectedPrinterId);
    console.log("File ID:", fileId);

    if (!fileId) {
      setAlert({ show: true, message: "File ID is undefined!", color: "red" });
      console.error("File ID is undefined. Cannot proceed with the request.");
      // setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      return;
    }

    try {
      await updateFilePrinter({
        fileId,
        newPrinterId: selectedPrinterId,
      }).unwrap();
      // setShowAlert(true);
      setAlert({
        show: true,
        message: "Printer updated successfully!",
        color: "green",
      });
      // setTimeout(() => {
      //   // setShowAlert(false);
      //   setAlert({
      //     show: true,
      //     message: "Failed to update printer.",
      //     color: "red",
      //   });
      //   handleOpen(); // Close the dialog
      // }, 1500);
      setTimeout(() => {
        setAlert({ show: false, message: "", color: "" });
        window.location.reload(); // Reload the window to see the updated data
      }, 2000);
    } catch (error) {
      console.error("Failed to change printer for file:", error);
      setAlert({
        show: true,
        message: "Failed to update printer.",
        color: "red",
      });
    }
  };

  const handleSavePrinterDetails = async () => {
    console.log("Updating Printer Details:", tempFormValues);

    const [campus, building, room] = tempFormValues.location.split(" - ");

    try {
      await updatePrinterDetails({
        id: printer._id,
        brand: tempFormValues.brand,
        location: { campus, building, room },
        number: tempFormValues.number,
        description: tempFormValues.description,
      }).unwrap();
      setAlert({
        show: true,
        message: "Printer details saved!",
        color: "green",
      });
      // setTimeout(() => setAlert({ show: false, message: "", color: "" }), 2000);
      // handleOpen();
      setTimeout(() => {
        setAlert({ show: false, message: "", color: "" });
        window.location.reload(); // Reload the window to see the updated data
      }, 2000);
    } catch (error) {
      console.error("Failed to update printer details:", error);
      setAlert({
        show: true,
        message: "Failed to update printer details.",
        color: "red",
      });
    }
  };

  return (
    <>
      {alert.show && (
        <Alert
          color={alert.color}
          className="fixed left-1/2 top-4 z-50 w-[90%] max-w-[400px] -translate-x-1/2 transform"
        >
          {alert.message}
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
              onChange={(e) =>
                setTempFormValues({ ...tempFormValues, brand: e })
              }
              disabled={isCustomer}
            >
              <Option value="Canon">Canon</Option>
              <Option value="HP">HP</Option>
              <Option value="Epson">Epson</Option>
              <Option value="Brother">Brother</Option>
              <Option value="Fuji Xerox">Fuji Xerox</Option>
            </Select>
            <Input
              label="Location"
              value={tempFormValues.location}
              onChange={(e) =>
                setTempFormValues({
                  ...tempFormValues,
                  location: e.target.value,
                })
              }
              disabled={isCustomer}
            />
            <Input
              label="Printer ID"
              value={tempFormValues.number}
              disabled={isCustomer}
            />
            <Input
              label="Description"
              value={tempFormValues.description}
              onChange={(e) =>
                setTempFormValues({
                  ...tempFormValues,
                  description: e.target.value,
                })
              }
              disabled={isCustomer}
            />
            {isCustomer && (
              <Select
                label="Change Printer"
                value={selectedPrinterId}
                onChange={(e) => setSelectedPrinterId(e)} // Directly set the selected printer ID
              >
                {filteredPrinters?.map((p) => (
                  <Option key={p._id} value={p._id}>
                    {p.number} - Queue: {p.queue}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          {isCustomer && (
            <Button color="blue" onClick={handleFilePrinterChange}>
              Change Printer
            </Button>
          )}
          {isSPSO && (
            <Button color="blue" onClick={handleSavePrinterDetails}>
              Save
            </Button>
          )}
          <Button color="gray" onClick={handleOpen}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PrinterInfoDialog;
