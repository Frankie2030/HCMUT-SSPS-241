import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Typography,
  Textarea,
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
    number: "", // Updated from "id" to "number" to match schema
    description: "",
  });

  const [addPrinter] = useAddPrinterMutation();

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
      console.log("Adding printer with values:", formValues); // Debugging line
      await addPrinter(formValues).unwrap();
      window.location.reload();
    } catch (error) {
      console.error("Failed to add printer:", error);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h6" color="blue-gray">
        Printer Configuration
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 p-2 md:grid-cols-2"
      >
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Location (Campus - Building - Room)
          </Typography>
          <Input
            placeholder="Enter the Location (e.g., Campus-Building-Room)"
            className="border border-gray-300 bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="location"
            onChange={handleChange}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Brand
          </Typography>
          <Select
            onChange={handleSelectChange("brand")}
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
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Printer ID
          </Typography>
          <Input
            placeholder="Enter Printer ID (e.g., M2020W-7521)"
            className="border border-gray-300 bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="number" // Updated to "number" to match schema
            onChange={handleChange}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Description
          </Typography>
          <Textarea
            name="description"
            placeholder="Enter a description"
            className="border border-gray-300 bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleChange}
          />
        </div>
        <div className="col-start-2 mb-1 grid grid-cols-2 justify-items-end gap-4 pt-9">
          <Button
            size="md"
            className="col-start-2 self-center rounded-full"
            color="blue"
            type="submit"
          >
            Confirm
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddPrinter;
