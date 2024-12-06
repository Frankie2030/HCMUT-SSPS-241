import filetype from "../assets/filetypeicon/filetype";
import {
  ClockIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { Card, Button, Input } from "@material-tailwind/react";
import moment from "moment";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";

const statusIcon = {
  queued: <ClockIcon className="w-6 sm:w-8" />,
  completed: <CheckBadgeIcon className="w-6 sm:w-8" />,
  cancelled: <ExclamationTriangleIcon className="w-6 sm:w-8" />,
};

const statusColor = {
  queued: "bg-gray-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

const LogItem = ({ file, printer, log, handleClick, admin }) => {
  return (
    <Card className="mb-5 flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center">
      {/* File Type Icon */}
      <div className="flex w-full items-center justify-center sm:h-16 sm:w-16">
        <img
          src={filetype[file.type]}
          alt=""
          className="h-12 w-12 sm:h-full sm:w-full"
        />
      </div>

      {/* File and Customer Info */}
      <div className="flex w-full flex-col gap-2 sm:w-1/3">
        <p className="truncate font-semibold">{file.name}</p>
        {admin && (
          <p className="text-sm text-gray-700">
            Customer: {log.userId.substring(0, 7)}
          </p>
        )}
        <p className="text-sm font-semibold">Page Number: {file.pageNum}</p>
      </div>

      {/* Printer Info and Status */}
      <div className="flex w-full flex-col gap-2 sm:w-2/3">
        <div className="flex flex-wrap justify-between text-sm">
          <p>Copies: {log.printingProperties.numberOfCopies}</p>
          <p>
            Printer:{" "}
            {`${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`}
          </p>
        </div>
        <div
          className={`flex items-center gap-2 ${statusColor[log.status]} w-full justify-center rounded-full px-4 py-2 sm:justify-start`}
        >
          <div>{statusIcon[log.status]}</div>
          <p className="text-center font-semibold text-white">
            {log.status} -{" "}
            {moment(log.startTime).format("DD/MM/YYYY, h:mm:ss A")}
          </p>
        </div>
      </div>

      {/* Details Button aligned to the right */}
      <div className="self-end sm:ml-auto sm:self-center">
        <Button
          color="blue"
          size="sm"
          className="w-full rounded-full sm:w-auto"
          onClick={() => handleClick(log._id)}
        >
          Details
        </Button>
      </div>
    </Card>
  );
};

const LogList = ({ files, printers, logs, filter, handleClick, admin }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(3);
  const [userIDFilter, setUserIDFilter] = useState("");

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;

  const filteredLogs = logs?.filter((log) => {
    if (filter !== "all" && log.status !== filter) return false;
    if (userIDFilter && !log.userId?.startsWith(userIDFilter)) return false;
    const exists =
      files?.some((file) => file._id === log.fileId) &&
      printers?.some((printer) => printer._id === log.printerId);
    return exists;
  });

  const currentLogs = filteredLogs?.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [logs, filter, userIDFilter]);

  return (
    <div className="flex flex-col gap-5">
      {/* {admin && (
        <div className="mt-1 w-full self-end sm:w-40">
          <Input
            type="text"
            value={userIDFilter}
            onChange={(e) => setUserIDFilter(e.target.value)}
            label="User ID"
          />
        </div>
      )} */}
      {currentLogs?.map((log) => {
        const file = files?.find((file) => file._id === log.fileId);
        const printer = printers?.find(
          (printer) => printer._id === log.printerId,
        );
        if (!file || !printer) return null;
        return (
          <LogItem
            key={log._id}
            file={file}
            printer={printer}
            log={log}
            handleClick={handleClick}
            admin={admin}
          />
        );
      })}
      {filteredLogs.length > logsPerPage && (
        <div className="self-center">
          <Pagination
            itemsPerPage={logsPerPage}
            totalItems={filteredLogs.length}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default LogList;
