import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Typography,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { useState } from "react";
import { useAddPrinterMutation } from "../slices/printerApiSlice";

const AddPrinter = () => {
  const [formValues, setFormValues] = useState({
    location: {
      campus: "",
      building: "",
      room: "",
    },
    brand: "",
    number: "",
    description: "",
  });

  const [addPrinter] = useAddPrinterMutation();
  const [showAlert, setShowAlert] = useState(false);

  const handleSelectChange = (name) => (selectedOption) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const handleChange = (event) => {
    if (event.target.name === "location") {
      const [campus, building, room] = event.target.value.split("-");
      setFormValues((prevValues) => ({
        ...prevValues,
        location: { campus, building, room },
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPrinter(formValues).unwrap();
      setShowAlert(true); // Show success alert

      // Wait 1.5 seconds, then reload the page
      setTimeout(() => {
        setShowAlert(false); // Hide alert
        window.location.reload(); // Reload page after 1.5 seconds
      }, 1500);
    } catch (error) {
      console.error("Failed to add printer:", error);
    }
  };

  return (
    <div className="relative">
      {/* Success Alert */}
      {showAlert && (
        <Alert
          color="green"
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 transform"
        >
          Printer added successfully!
        </Alert>
      )}

      <Card color="transparent" shadow={false} className="p-4 md:p-8">
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          Printer Configuration
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <Typography variant="small" color="blue-gray">
              Location (Campus - Building - Room)
            </Typography>
            <Input
              placeholder="Enter Location (e.g., Campus-Building-Room)"
              className="border border-gray-300 bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              name="location"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="small" color="blue-gray">
              Brand
            </Typography>
            <Select
              onChange={handleSelectChange("brand")}
              label="Choose Brand"
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
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="small" color="blue-gray">
              Printer ID
            </Typography>
            <Input
              placeholder="Enter Printer ID (e.g., M2020W-7521)"
              className="border border-gray-300 bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              name="number"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="small" color="blue-gray">
              Description
            </Typography>
            <Textarea
              name="description"
              placeholder="Enter a description"
              className="border border-gray-300 bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="col-span-1 mt-4 flex justify-center md:col-span-2">
            <Button
              size="md"
              className="w-full rounded-full md:w-auto"
              color="blue"
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddPrinter;
