import { useEffect, useState } from "react";
import plussign from "../../assets/filetypeicon/plus.png";
import {
  useGetTypesQuery,
  useAddTypeMutation,
  useDeleteTypeMutation,
} from "../../slices/configApiSlice";
import typeIcon from "../../assets/filetypeicon/filetype.js";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

const ButtonList = () => {
  const { data: typeList } = useGetTypesQuery();
  const [addType] = useAddTypeMutation();
  const [deleteType] = useDeleteTypeMutation();

  useEffect(() => {
    console.log(typeList);
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((open) => !open);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd((openAdd) => !openAdd);
  const [newButtonType, setNewButtonType] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleButtonClick = (type) => {
    setSelectedType(type);
    setOpen(true);
  };

  const handleButtonAddClick = () => {
    setOpenAdd(true);
  };

  const handleButtonConfirm = () => {
    console.log("deleteing...");
    deleteType(selectedType);
    setOpen(false);
    window.location.reload();
  };

  const handleButtonAddConfirm = (type) => {
    addType(type);
    setOpen(false);
    window.location.reload();
  };

  const handleButtonCancel = () => {
    setOpen(false);
  };

  const handleButtonAddCancel = () => {
    setOpenAdd(false);
  };

  const handleSelectChange = (value) => {
    setNewButtonType(value);
  };

  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {typeList?.map((type, index) => (
        <div key={index}>
          <Button
            className="w-30 m-4 bg-blue-400"
            key={index}
            onClick={() => handleButtonClick(type)}
          >
            <img className="" src={typeIcon[type]} alt={typeList[index]} />
          </Button>
        </div>
      ))}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Bạn có muốn xóa định dạng {selectedType}?</DialogHeader>
        <DialogBody className="flex flex-col gap-3"></DialogBody>
        <DialogFooter>
          <Button className="m-4" onClick={handleButtonConfirm}>
            Yes
          </Button>
          <Button className="m-4" onClick={handleButtonCancel}>
            No
          </Button>
        </DialogFooter>
      </Dialog>
      <Button
        className="w-30 m-4 bg-blue-400"
        onClick={() => handleButtonAddClick()}
      >
        <img className="" src={plussign} alt={"add"} />
      </Button>
      <Dialog open={openAdd} handler={handleOpenAdd}>
        <DialogHeader>Enter the Type you want</DialogHeader>
        <DialogBody className="flex flex-col gap-3">
          <Select value={newButtonType} onChange={handleSelectChange}>
            <Option value="jpg">jpg</Option>
            <Option value="msword">msword</Option>
            <Option value="doc">doc</Option>
            <Option value="docx">docx</Option>
            <Option value="pdf">pdf</Option>
            <Option value="png">png</Option>
            <Option value="pptx">pptx</Option>
            <Option value="svg">svg</Option>
            <Option value="text">text</Option>
            <Option value="xls">xls</Option>
            <Option value="xlsx">xlsx</Option>
            <Option value="xps">xps</Option>
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button
            className="m-4"
            onClick={() => handleButtonAddConfirm(newButtonType)}
          >
            Yes
          </Button>
          <Button className="m-4" onClick={handleButtonAddCancel}>
            No
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ButtonList;
