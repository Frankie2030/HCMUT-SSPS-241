import filetype from "../assets/filetypeicon/filetype";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useState } from "react";

import PrinterInfoDialog from "./PrinterInfoDialog"; // Import the PrinterInfoDialog

const statusIcon = {
  verified: <CheckIcon className="w-5" />,
  notVerified: <ExclamationTriangleIcon className="w-5" />,
};

const statusColor = {
  verified: "bg-green-500",
  notVerified: "bg-yellow-500",
};

const FileItem = ({ file, printer, onPrinterClick }) => {
  const date = new Date(file.uploadTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return (
    <Card className="mx-1/8 mb-[30px] grid h-40 w-full grid-cols-11 gap-5 p-5">
      <div className="col-span-1">
        <img src={filetype[file.type]} alt="" className="w-full p-[10px]" />
      </div>
      <div className="col-span-3">
        <div className="h-full grid-rows-2">
          <p className="flex h-1/2 items-center truncate font-semibold">
            {file.name.substring(0, 60)}
          </p>
          {file.pageNum !== 0 && (
            <p className="flex h-1/2 items-center font-semibold">
              Page Number: {file.pageNum}
            </p>
          )}
        </div>
      </div>
      <div className="col-span-5 flex flex-col justify-between">
        <div className="w-full">
          {printer && (
            <>
              <p
                className="cursor-pointer font-semibold text-blue-500"
                onClick={() => onPrinterClick(printer)} // Trigger dialog open on click
              >
                Printer Name: {printer.number}
              </p>
              <p>Files in Queue: {printer.queue}</p>
            </>
          )}
        </div>
        <div className="flex h-1/2 items-end">
          <div
            className={`rounded-full ${
              statusColor[file.status]
            } flex h-10 w-full items-center justify-center`}
          >
            <div className="w-1/12">{statusIcon[file.status]}</div>
            <p className="font-full w-2/3 text-center font-semibold">
              {file.status} - {`uploaded at ${day}/${month}/${year}`}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <Link to={`/preview/${file._id}`} className="w-1/2">
          <Button
            size="lg"
            className="w-full rounded-full bg-blue-500 px-4 py-3 text-white hover:bg-blue-700"
          >
            Print
          </Button>
        </Link>
      </div>
    </Card>
  );
};

const FileList = ({ files, printers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [selectedPrinter, setSelectedPrinter] = useState(null); // State for selected printer
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePrinterClick = (printer) => {
    setSelectedPrinter(printer);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPrinter(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-5">
      {currentItems?.map((file) => {
        // Find the printer that matches the file's printerId
        const printer = printers.find((p) => p._id === file.printerId);
        return (
          <FileItem
            key={file._id}
            file={file}
            printer={printer}
            onPrinterClick={handlePrinterClick} // Pass function to handle printer name click
          />
        );
      })}
      <div className="self-end">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={files?.length}
          paginate={paginate}
        />
      </div>

      {/* Printer Info Dialog */}
      {selectedPrinter && (
        <PrinterInfoDialog
          open={dialogOpen}
          handleOpen={handleDialogClose}
          printer={selectedPrinter}
        />
      )}
    </div>
  );
};

export default FileList;
