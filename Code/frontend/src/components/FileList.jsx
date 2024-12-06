import filetype from "../assets/filetypeicon/filetype";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
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
                onClick={() => onPrinterClick(printer, file._id)} // Pass printer and file ID
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
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null); // State for selected file ID
  const [dialogOpen, setDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const handlePrinterClick = (printer, fileId) => {
    console.log("Printer:", printer); // Debug printer object
    console.log("File ID:", fileId); // Debug file ID
    setSelectedPrinter(printer);
    setSelectedFileId(fileId); // Ensure fileId is set correctly
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPrinter(null);
    setSelectedFileId(null); // Reset the file ID when dialog closes
  };

  // Filter and sort files
  const filteredAndSortedFiles = files
    ?.filter((file) => {
      const query = searchQuery.toLowerCase();
      return (
        file.name.toLowerCase().includes(query) ||
        file.status.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOption === "nameAsc") return a.name.localeCompare(b.name);
      if (sortOption === "nameDesc") return b.name.localeCompare(a.name);
      if (sortOption === "uploadDateAsc")
        return new Date(a.uploadTime) - new Date(b.uploadTime);
      if (sortOption === "uploadDateDesc")
        return new Date(b.uploadTime) - new Date(a.uploadTime);
      return 0; // Default sort
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedFiles?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination on search or sort change
  }, [searchQuery, sortOption]);

  return (
    <div className="flex flex-col gap-5">
      {/* Search and Sort Section */}
      <div className="flex flex-col items-center justify-between gap-4 border-b pb-4 md:flex-row md:gap-6">
        <Input
          label="Search Files"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by file name or status"
          className="flex-grow"
        />
        <Select
          label="Sort By"
          value={sortOption}
          onChange={(e) => setSortOption(e)}
          className="flex-grow"
        >
          <Option value="default">Default</Option>
          <Option value="nameAsc">Name (A-Z)</Option>
          <Option value="nameDesc">Name (Z-A)</Option>
          <Option value="uploadDateAsc">Upload Date (Oldest)</Option>
          <Option value="uploadDateDesc">Upload Date (Newest)</Option>
        </Select>
      </div>

      {/* File List */}
      {currentItems?.map((file) => {
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

      {/* Pagination */}
      {currentItems?.length > 0 && (
        <div className="mt-4 self-center">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredAndSortedFiles?.length}
            paginate={paginate}
          />
        </div>
      )}

      {/* No Files Message */}
      {currentItems?.length === 0 && (
        <Typography variant="h6" color="gray" className="mt-8 text-center">
          No files match your search criteria.
        </Typography>
      )}

      {/* Printer Info Dialog */}
      {selectedPrinter &&
        selectedFileId && ( // Ensure printer and file ID are set
          <PrinterInfoDialog
            open={dialogOpen}
            handleOpen={handleDialogClose}
            printer={selectedPrinter}
            fileId={selectedFileId} // Pass the selected file ID
          />
        )}
    </div>
  );
};

export default FileList;
