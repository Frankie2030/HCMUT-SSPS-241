import {
  Switch,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
// import PrinterImage from "../assets/PrinterImage.png";
import PrinterImage from "../assets/PrinterImage-02.avif";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import FileUploadDialog from "./FileUploadDialog";
import PrinterInfoDialog from "./PrinterInfoDialog";
import {
  useSetStatusMutation,
  useDeletePrinterMutation,
} from "../slices/printerApiSlice";
import Pagination from "./Pagination";

const PrinterItem = ({ printer, canSelect }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((open) => !open);

  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo((open) => !open);

  const [checked, setChecked] = useState(printer.status === "enabled");
  const handleChecked = () => setChecked((checked) => !checked);

  const [setStatus] = useSetStatusMutation();
  const [deletePrinter] = useDeletePrinterMutation();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleChange = async () => {
    await setStatus({
      id: printer._id,
      status: !checked ? "enabled" : "disabled",
    });
    handleChecked();
    window.location.reload();
  };

  const handleDelete = async () => {
    await deletePrinter(printer._id);
    window.location.reload();
  };

  const openDeleteConfirmation = () => {
    setConfirmDeleteOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setConfirmDeleteOpen(false);
  };

  const confirmDelete = async () => {
    await handleDelete();
    closeDeleteConfirmation();
  };

  return (
    <div className="grid grid-cols-6 items-center gap-10">
      <img src={PrinterImage} className="col-span-1" alt="Printer" />
      <div className="col-span-3">
        <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
          Number: {printer.number}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2 font-bold">
          Location:{" "}
          {`${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2 font-bold">
          In Queue: {printer.queue}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2 font-bold">
          Description: {printer.description}
        </Typography>
      </div>
      {canSelect ? (
        <>
          <div className="col-span-2 text-center">
            <Button
              color="blue"
              size="lg"
              className="w-4/5 rounded-full font-medium"
              onClick={handleOpen}
            >
              Choose
            </Button>
          </div>
          <FileUploadDialog
            open={open}
            handleOpen={handleOpen}
            printerId={printer._id}
          />
        </>
      ) : (
        <>
          <div className="grid justify-items-center">
            <Switch
              size="lg"
              ripple={false}
              className="h-full w-full checked:bg-[#2ec946]"
              checked={checked}
              onChange={handleChange}
              containerProps={{
                className: "w-24 h-12",
              }}
              circleProps={{
                className:
                  "left-1 border-none peer-checked:translate-x-12 w-10 h-10",
              }}
            />
          </div>
          <div className="flex items-center gap-5">
            <Button
              variant="filled"
              color="red"
              size="lg"
              className="rounded-full font-medium"
              onClick={openDeleteConfirmation}
            >
              Delete
            </Button>
            <IconButton variant="text" onClick={handleOpenInfo}>
              <InformationCircleIcon className="w-7" color="blue" />
            </IconButton>
          </div>
          <PrinterInfoDialog
            open={openInfo}
            handleOpen={handleOpenInfo}
            printer={printer}
          />
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} handler={setConfirmDeleteOpen}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>Are you sure you want to delete this printer?</DialogBody>
        <DialogFooter>
          <Button color="red" onClick={confirmDelete} className="mr-2">
            Yes
          </Button>
          <Button color="blue-gray" onClick={closeDeleteConfirmation}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

const PrinterList = ({ printers, canSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [printersPerPage] = useState(3);

  const indexOfLastPrinter = currentPage * printersPerPage;
  const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
  let enabledPrinters = printers;
  if (canSelect) {
    enabledPrinters = printers.filter(
      (printer) => printer.status === "enabled",
    );
  }
  let currentPrinters = enabledPrinters?.slice(
    indexOfFirstPrinter,
    indexOfLastPrinter,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [printers, canSelect]);

  return (
    <div className="flex min-h-[550px] flex-col gap-10">
      {currentPrinters?.map((printer) => (
        <PrinterItem
          key={printer._id}
          printer={printer}
          canSelect={canSelect}
        />
      ))}
      {currentPrinters?.length > 0 && (
        <div className="self-end">
          <Pagination
            itemsPerPage={printersPerPage}
            totalItems={enabledPrinters?.length}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default PrinterList;
