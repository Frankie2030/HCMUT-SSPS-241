import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {
  useCreateFileMutation,
  useStoreFileMutation,
} from "../slices/fileApiSlice";
import { PDFDocument } from "pdf-lib";

const getPageCount = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const arrayBuffer = e.target.result;
      const pdf = await PDFDocument.load(arrayBuffer);
      resolve(pdf.getPageCount());
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const FileUploadDialog = ({ open, handleOpen, printerId }) => {
  const [file, setFile] = useState();
  const { _id: userId } = useSelector((state) => state.auth.userData);

  const [createFile] = useCreateFileMutation();
  const [storeFile] = useStoreFileMutation();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const f = {
      name: file.name,
      type: file.type.split("/")[1],
      userId: userId,
      printerId: printerId,
      pageNum: (file.type.split("/")[1] === 'pdf' ? await getPageCount(file) : 1),
    };
    const {data: fileId} = await createFile(f);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("_id", fileId);
    await storeFile(formData);

    setFile(null);
    handleOpen();
    window.location.reload();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>File Upload</DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <input type="file" onChange={handleFileChange} />
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="blue" onClick={handleSubmit}>
          <span>OK</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FileUploadDialog;
