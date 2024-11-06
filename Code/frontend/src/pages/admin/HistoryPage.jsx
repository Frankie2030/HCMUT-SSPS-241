import {
  Typography,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { VerticalTabs } from "../../components/ManagePrintingPage/VerticalTab";
import {
  FolderIcon,
  CalendarIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import LogList from "../../components/LogList";
import { useGetLogsQuery } from "../../slices/logApiSlice";
import { useGetFilesQuery } from "../../slices/fileApiSlice";
import { useGetPrinterQuery } from "../../slices/printerApiSlice";
import { useState } from "react";
import moment from "moment";

const LogDialog = ({ open, handleOpen, log }) => {
  const printingConfig = log?.printingProperties;
  const schedule = log?.schedule;
  return printingConfig ? (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Details of Printing History</DialogHeader>
      <DialogBody className="flex flex-col gap-5">
        {Object.keys(printingConfig).map((key) => {
          return key !== "marginCustomTop" &&
            key !== "marginCustomBottom" &&
            key !== "marginCustomLeft" &&
            key !== "marginCustomRight" &&
            key !== "pagesToBePrintedCustom" ? (
            <div key={key} className="mx-3 grid grid-cols-2 items-center">
              {key === "doubleSided" ? (
                <Typography variant="h6">Side Number: </Typography>
              ) : key === "pagesToBePrinted" ? (
                <Typography variant="h6">Printed Pages: </Typography>
              ) : key === "pageLayout" ? (
                <Typography variant="h6">Layout: </Typography>
              ) : key === "paperSize" ? (
                <Typography variant="h6">Page Size: </Typography>
              ) : key === "pagePerSide" ? (
                <Typography variant="h6">Pages per Side: </Typography>
              ) : key === "margin" ? (
                <Typography variant="h6">Margin: </Typography>
              ) : key === "numberOfCopies" ? (
                <Typography variant="h6">Copies: </Typography>
              ) : null}
              <Typography>
                {key === "pagesToBePrinted" && printingConfig[key] === "custom"
                  ? printingConfig["pagesToBePrintedCustom"]
                  : key === "margin" && printingConfig[key] === "default"
                    ? "Top: 1 - Bottom: 1 - Left: 1 - Right: 1"
                    : key === "margin" && printingConfig[key] === "custom"
                      ? `Top: ${printingConfig["marginCustomTop"]} - Bottom: ${printingConfig["marginCustomBottom"]} - Left: ${printingConfig["marginCustomLeft"]} - Right: ${printingConfig["marginCustomRight"]}`
                      : printingConfig[key]}
              </Typography>
            </div>
          ) : null;
        })}
        <div className="mx-3 grid grid-cols-2">
          <Typography variant="h6">Take Date: </Typography>
          <Typography>
            {moment(schedule).format("DD/MM/YYYY, h:mm:ss A")}
          </Typography>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="blue" onClick={handleOpen}>
          OK
        </Button>
      </DialogFooter>
    </Dialog>
  ) : null;
};

const HistoryPage = () => {
  const { data: files, isLoading: isFilesLoading } = useGetFilesQuery();
  const { data: logs, isLoading: isLogsLoading } = useGetLogsQuery();
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
      <FolderIcon className="w-10" />,
      <LogList
        files={files}
        printers={printers}
        logs={logs}
        filter="all"
        handleClick={handleClick}
        admin={true}
      />,
    ),
    createTabItem(
      "Arranged",
      "2",
      <CalendarIcon className="w-10" />,
      <div>
        <LogList
          files={files}
          printers={printers}
          logs={logs}
          filter="queued"
          handleClick={handleClick}
          admin={true}
        />
      </div>,
    ),
    createTabItem(
      "Canceled",
      "3",
      <XCircleIcon className="w-10" />,
      <LogList
        files={files}
        printers={printers}
        logs={logs}
        filter="cancelled"
        handleClick={handleClick}
        admin={true}
      />,
    ),
    createTabItem(
      "Printed",
      "4",
      <CheckCircleIcon className="w-10" />,
      <LogList
        files={files}
        printers={printers}
        logs={logs}
        filter="completed"
        handleClick={handleClick}
        admin={true}
      />,
    ),
  ];

  return isFilesLoading || isLogsLoading || isPrintersLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col">
      <Typography variant="h4">PRINTING HISTORY</Typography>
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
