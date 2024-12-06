import {
  Switch,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import PrinterImage from "../assets/PrinterImage-02.avif";
import FileUploadDialog from "./FileUploadDialog";
import PrinterInfoDialog from "./PrinterInfoDialog";
import {
  useSetStatusMutation,
  useDeletePrinterMutation,
} from "../slices/printerApiSlice";
import Pagination from "./Pagination";

const PrinterItem = ({ printer, canSelect, showAlert }) => {
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
    try {
      await setStatus({
        id: printer._id,
        status: !checked ? "enabled" : "disabled",
      });
      handleChecked();
      showAlert("Status updated successfully", "success");
    } catch (error) {
      showAlert("Failed to update status", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePrinter(printer._id);
      showAlert("Printer deleted successfully", "success");
    } catch (error) {
      showAlert("Failed to delete printer", "error");
    }
  };

  const openDeleteConfirmation = () => setConfirmDeleteOpen(true);
  const closeDeleteConfirmation = () => setConfirmDeleteOpen(false);
  const confirmDelete = async () => {
    await handleDelete();
    closeDeleteConfirmation();
  };

  return (
    <div className="flex flex-col items-center gap-5 border-b p-4 md:flex-row md:justify-between">
      <img
        src={PrinterImage}
        className="h-24 w-24 md:h-32 md:w-32"
        alt="Printer"
      />
      <div className="flex-1">
        <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
          Number: {printer.number}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          Location:{" "}
          {`${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          In Queue: {printer.queue}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Description: {printer.description}
        </Typography>
      </div>
      {canSelect ? (
        <div className="text-center md:w-1/4 md:text-right">
          <Button
            color="blue"
            size="lg"
            className="w-full rounded-full font-medium"
            onClick={handleOpen}
            disabled={printer.queue >= 10}
          >
            Choose
          </Button>
          <FileUploadDialog
            open={open}
            handleOpen={handleOpen}
            printerId={printer._id}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center md:w-1/4 md:flex-row md:items-start">
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
            disabled={printer.restricted}
          />
          <div className="flex gap-2">
            {!printer.restricted && ( // Hide delete button for load-balancing printers
              <Button
                variant="filled"
                color="red"
                size="lg"
                className="w-24 rounded-full font-medium"
                onClick={openDeleteConfirmation}
              >
                Delete
              </Button>
            )}
            <IconButton variant="text" onClick={handleOpenInfo}>
              <InformationCircleIcon className="w-7" color="blue" />
            </IconButton>
          </div>
          <PrinterInfoDialog
            open={openInfo}
            handleOpen={handleOpenInfo}
            printer={printer}
          />
        </div>
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

// const PrinterList = ({ printers, canSelect }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [printersPerPage] = useState(3);
//   const [alert, setAlert] = useState({ show: false, message: "", type: "" });

//   const showAlert = (message, type) => {
//     setAlert({ show: true, message, type });

//     // Wait 1.5 seconds, then hide alert and reload the page
//     setTimeout(() => {
//       setAlert({ show: false, message: "", type: "" });
//       window.location.reload();
//     }, 1500);
//   };

//   const indexOfLastPrinter = currentPage * printersPerPage;
//   const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
//   let enabledPrinters = printers;
//   if (canSelect) {
//     enabledPrinters = printers.filter(
//       (printer) => printer.status === "enabled",
//     );
//   }
//   const currentPrinters = enabledPrinters?.slice(
//     indexOfFirstPrinter,
//     indexOfLastPrinter,
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [printers, canSelect]);

//   return (
//     <div className="relative flex min-h-[550px] flex-col gap-10">
//       {alert.show && (
//         <Alert
//           color={alert.type === "success" ? "green" : "red"}
//           className="fixed left-1/2 top-4 z-[1000] w-1/3 -translate-x-1/2 transform"
//         >
//           {alert.message}
//         </Alert>
//       )}

//       {currentPrinters?.map((printer) => (
//         <PrinterItem
//           key={printer._id}
//           printer={printer}
//           canSelect={canSelect}
//           showAlert={showAlert}
//         />
//       ))}

//       {currentPrinters?.length > 0 && (
//         <div className="self-end">
//           <Pagination
//             itemsPerPage={printersPerPage}
//             totalItems={enabledPrinters?.length}
//             paginate={paginate}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const PrinterList = ({ printers, canSelect }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [printersPerPage] = useState(3);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("default");
//   const [alert, setAlert] = useState({ show: false, message: "", type: "" });

//   const showAlert = (message, type) => {
//     setAlert({ show: true, message, type });
//     setTimeout(() => {
//       setAlert({ show: false, message: "", type: "" });
//     }, 1500);
//   };

//   // Filter and sort printers
//   const filteredAndSortedPrinters = printers
//     ?.filter((printer) => {
//       const query = searchQuery.toLowerCase();
//       return (
//         printer.number.toLowerCase().includes(query) ||
//         printer.location.campus.toLowerCase().includes(query) ||
//         printer.description.toLowerCase().includes(query)
//       );
//     })
//     .sort((a, b) => {
//       if (sortOption === "queueAsc") return a.queue - b.queue;
//       if (sortOption === "queueDesc") return b.queue - a.queue;
//       if (sortOption === "locationAsc")
//         return a.location.campus.localeCompare(b.location.campus);
//       if (sortOption === "locationDesc")
//         return b.location.campus.localeCompare(a.location.campus);
//       return 0; // Default sort (unsorted)
//     });

//   // Pagination logic
//   const indexOfLastPrinter = currentPage * printersPerPage;
//   const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
//   const currentPrinters = filteredAndSortedPrinters?.slice(
//     indexOfFirstPrinter,
//     indexOfLastPrinter,
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     setCurrentPage(1); // Reset pagination on search or sort change
//   }, [searchQuery, sortOption]);

//   return (
//     <div className="relative flex min-h-[550px] flex-col gap-10">
//       {/* Search and Sort Section */}
//       <div className="mb-4 flex items-center justify-between">
//         <Input
//           label="Search Printers"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-1/2"
//         />
//         <Select
//           label="Sort By"
//           value={sortOption}
//           onChange={(e) => setSortOption(e)}
//           className="w-1/3"
//         >
//           <Option value="default">Default</Option>
//           <Option value="queueAsc">Queue (Ascending)</Option>
//           <Option value="queueDesc">Queue (Descending)</Option>
//           <Option value="locationAsc">Location (Ascending)</Option>
//           <Option value="locationDesc">Location (Descending)</Option>
//         </Select>
//       </div>

//       {/* Alert Section */}
//       {alert.show && (
//         <Alert
//           color={alert.type === "success" ? "green" : "red"}
//           className="fixed left-1/2 top-4 z-[1000] w-1/3 -translate-x-1/2 transform"
//         >
//           {alert.message}
//         </Alert>
//       )}

//       {/* Printers List */}
//       {currentPrinters?.map((printer) => (
//         <PrinterItem
//           key={printer._id}
//           printer={printer}
//           canSelect={canSelect}
//           showAlert={showAlert}
//         />
//       ))}

//       {/* Pagination */}
//       {currentPrinters?.length > 0 && (
//         <div className="self-end">
//           <Pagination
//             itemsPerPage={printersPerPage}
//             totalItems={filteredAndSortedPrinters?.length}
//             paginate={paginate}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

const PrinterList = ({ printers, canSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [printersPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 1500);
  };

  // Filter and sort printers
  const filteredAndSortedPrinters = printers
    ?.filter((printer) => {
      const query = searchQuery.toLowerCase();
      return (
        printer.number.toLowerCase().includes(query) ||
        printer.location.campus.toLowerCase().includes(query) ||
        printer.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOption === "queueAsc") return a.queue - b.queue;
      if (sortOption === "queueDesc") return b.queue - a.queue;
      if (sortOption === "locationAsc")
        return a.location.campus.localeCompare(b.location.campus);
      if (sortOption === "locationDesc")
        return b.location.campus.localeCompare(a.location.campus);
      return 0; // Default sort (unsorted)
    });

  // Pagination logic
  const indexOfLastPrinter = currentPage * printersPerPage;
  const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
  const currentPrinters = filteredAndSortedPrinters?.slice(
    indexOfFirstPrinter,
    indexOfLastPrinter,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination on search or sort change
  }, [searchQuery, sortOption]);

  return (
    <div className="relative flex flex-col gap-8">
      {/* Search and Sort Section */}
      <div className="flex flex-col items-center justify-between gap-4 border-b pb-4 md:flex-row md:gap-6">
        <Input
          label="Search Printers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by number, location, or description"
          className="flex-grow"
        />
        <Select
          label="Sort By"
          value={sortOption}
          onChange={(e) => setSortOption(e)}
          className="flex-grow"
        >
          <Option value="default">Default</Option>
          <Option value="queueAsc">Queue (Ascending)</Option>
          <Option value="queueDesc">Queue (Descending)</Option>
          <Option value="locationAsc">Location (Ascending)</Option>
          <Option value="locationDesc">Location (Descending)</Option>
        </Select>
      </div>

      {/* Alert Section */}
      {alert.show && (
        <Alert
          color={alert.type === "success" ? "green" : "red"}
          className="fixed left-1/2 top-4 z-[1000] w-1/3 -translate-x-1/2 transform"
        >
          {alert.message}
        </Alert>
      )}

      {/* Printers List */}
      {currentPrinters?.map((printer) => (
        <PrinterItem
          key={printer._id}
          printer={printer}
          canSelect={canSelect}
          showAlert={showAlert}
        />
      ))}

      {/* Pagination */}
      {currentPrinters?.length > 0 && (
        <div className="mt-4 self-center">
          <Pagination
            itemsPerPage={printersPerPage}
            totalItems={filteredAndSortedPrinters?.length}
            paginate={paginate}
          />
        </div>
      )}

      {/* Show a message when no printers match the search */}
      {currentPrinters?.length === 0 && (
        <Typography variant="h6" color="gray" className="mt-8 text-center">
          No printers match your search criteria.
        </Typography>
      )}
    </div>
  );
};

export default PrinterList;
