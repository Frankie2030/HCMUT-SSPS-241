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
    id: "",
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
    await addPrinter(formValues);
    window.location.reload();
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h6" color="blue-gray">
        Thông tin máy in
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 p-2 md:grid-cols-2"
      >
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Vị trí (Cơ sở - tòa - phòng)
          </Typography>
          <Input
            placeholder="Nhập vị trí của máy in"
            className=" border-none bg-gray-100 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="location"
            onChange={handleChange}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Hãng máy
          </Typography>
          <Select onChange={handleSelectChange("brand")}>
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
            Số hiệu
          </Typography>
          <Input
            placeholder="Nhập ID"
            className=" border-none bg-gray-100 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="number"
            onChange={handleChange}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Mô tả
          </Typography>
          <Textarea
            name="description"
            placeholder="Nhập mô tả"
            className=" border-none bg-gray-100 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleChange}
          />
        </div>
        <div className=" col-start-2 mb-1 grid grid-cols-2 justify-items-end gap-4 pt-9 ">
          <Button
            size="md"
            className=" col-start-2 self-center rounded-full "
            color="blue"
            type="submit"
          >
            Xác nhận
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddPrinter;
