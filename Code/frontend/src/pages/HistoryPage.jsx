import {
  Typography,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { VerticalTabs } from "../components/ManagePrintingPage/VerticalTab";
import {
  FolderIcon,
  CalendarIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import LogList from "../components/LogList";
import {
  useGetLogsByUserQuery,
  useCancelLogMutation,
} from "../slices/logApiSlice";
import { useGetFilesByUserQuery } from "../slices/fileApiSlice";
import { useGetPrinterQuery } from "../slices/printerApiSlice";
import { useState } from "react";
import moment from "moment";
import Loading from "../components/Loading";

import React from "react";

// Function to transform keys to title case
const toTitleCase = (str) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .toLowerCase() // Convert all to lowercase
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join back into a string
};

const LogDialog = ({ open, handleOpen, log }) => {
  const printingConfig = log?.printingProperties;
  const schedule = log?.schedule;
  const [cancelLog] = useCancelLogMutation();

  return printingConfig ? (
    <Dialog
      open={open}
      handler={handleOpen}
      size="md"
      className="mx-auto w-full max-w-lg p-2 sm:p-4"
    >
      <DialogHeader>Detail of Printing History</DialogHeader>
      <DialogBody className="flex flex-col gap-4">
        {Object.keys(printingConfig).map((key) =>
          key !== "marginCustomTop" &&
          key !== "marginCustomBottom" &&
          key !== "marginCustomLeft" &&
          key !== "marginCustomRight" &&
          key !== "pagesToBePrintedCustom" ? (
            <div key={key} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Typography variant="h6" className="text-gray-700">
                {toTitleCase(key)}:
              </Typography>
              <Typography className="text-gray-900">
                {key === "pagesToBePrinted" && printingConfig[key] === "custom"
                  ? printingConfig["pagesToBePrintedCustom"]
                  : key === "margin" && printingConfig[key] === "default"
                    ? "Top: 1 - Bottom: 1 - Left: 1 - Right: 1"
                    : key === "margin" && printingConfig[key] === "custom"
                      ? `Top: ${printingConfig["marginCustomTop"]} - Bottom: ${printingConfig["marginCustomBottom"]} - Left: ${printingConfig["marginCustomLeft"]} - Right: ${printingConfig["marginCustomRight"]}`
                      : printingConfig[key]}
              </Typography>
            </div>
          ) : null,
        )}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Typography variant="h6" className="text-gray-700">
            Take Date:
          </Typography>
          <Typography className="text-gray-900">
            {moment(schedule).format("DD/MM/YYYY, h:mm:ss A")}
          </Typography>
        </div>
      </DialogBody>
      <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button
          color="red"
          onClick={() => {
            cancelLog(log._id);
            window.location.reload();
          }}
        >
          Cancel
        </Button>
        <Button color="blue" onClick={handleOpen}>
          OK
        </Button>
      </DialogFooter>
    </Dialog>
  ) : null;
};

const HistoryPage = () => {
  const { data: files, isLoading: isFilesLoading } = useGetFilesByUserQuery();
  const { data: logs, isLoading: isLogsLoading } = useGetLogsByUserQuery();
  const { data: printers, isLoading: isPrintersLoading } = useGetPrinterQuery();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((open) => !open);
  const [infoId, setInfoId] = useState(null);

  const handleClick = (id) => {
    handleOpen();
    setInfoId(id);
  };

  const createTabItem = (label, value, icon, desc) => ({
    label,
    value,
    icon,
    desc,
  });

  const tabItems = [
    createTabItem(
      "All",
      "1",
      <FolderIcon className="w-6 sm:w-10" />,
      <LogList
        files={files}
        printers={printers}
        logs={logs}
        filter="all"
        handleClick={handleClick}
      />,
    ),
    createTabItem(
      "Arranged",
      "2",
      <CalendarIcon className="w-6 sm:w-10" />,
      <LogList
        files={files}
        printers={printers}
        logs={logs}
        filter="queued"
        handleClick={handleClick}
      />,
    ),
    createTabItem(
      "Canceled",
      "3",
      <XCircleIcon className="w-6 sm:w-10" />,
      <LogList
        files={files}
        printers={printers}
        logs={logs}
        filter="cancelled"
        handleClick={handleClick}
      />,
    ),
    createTabItem(
      "Printed",
      "4",
      <CheckCircleIcon className="w-6 sm:w-10" />,
      <LogList
        files={files}
        printers={printers}
        logs={logs}
        filter="completed"
        handleClick={handleClick}
      />,
    ),
  ];

  return isFilesLoading || isLogsLoading || isPrintersLoading ? (
    // <div className="flex h-screen items-center justify-center">Loading...</div>
    <Loading />
  ) : (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <Typography variant="h4" className="mb-6 text-center">
        PRINTING HISTORY
      </Typography>
      <VerticalTabs item={tabItems} />
      <LogDialog
        open={open}
        handleOpen={handleOpen}
        log={logs?.find((log) => log._id === infoId)}
      />
    </div>
  );
};

export default HistoryPage;
