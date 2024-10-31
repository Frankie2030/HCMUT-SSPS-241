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
  queued: <ClockIcon className="w-8" />,
  completed: <CheckBadgeIcon className="w-8" />,
  cancelled: <ExclamationTriangleIcon className="w-8" />,
};

const statusColor = {
  queued: "bg-gray-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

const LogItem = ({ file, printer, log, handleClick, admin }) => {
  return (
    <Card className="mb-5 grid h-40 w-full grid-cols-10 gap-5">
      <div className="col-span-1 flex w-32 items-center">
        <img src={filetype[file.type]} alt="" className="w-full p-[10px]" />
      </div>
      <div className="col-span-3 h-full grid-rows-3 ps-10">
        <p className="flex h-1/2 items-center truncate font-semibold">
          {file.name}
        </p>
        {admin ? (
          <p className="font-semibold">
            Customer: {log.userId.substring(0, 7)}
          </p>
        ) : null}
        <p className="flex h-1/2 items-center font-semibold">
          Page Number: {file.pageNum}
        </p>
      </div>
      <div className="col-span-6">
        <div className="h-full grid-rows-2">
          <div className="flex h-1/2 items-center">
            <div className="w-1/2">
              <p>Number of copies: {log.printingProperties.numberOfCopies}</p>
            </div>
            <div className="w-1/2">
              <p>
                Printer:{" "}
                {`${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`}
              </p>
            </div>
          </div>
          <div className="grid h-1/2 grid-cols-4 items-center gap-5">
            <div
              className={`rounded-full ${
                statusColor[log.status]
              } col-span-3 flex h-[80%] w-full items-center justify-center`}
            >
              <div className="w-1/12">{statusIcon[log.status]}</div>
              <p className="font-full w-2/3 text-center font-semibold">
                {log.status} - created at{" "}
                {moment(log.startTime).format("DD/MM/YYYY, h:mm:ss A")}
              </p>
            </div>
            <Button
              className="col-span-1 rounded-full"
              color="blue"
              onClick={() => handleClick(log._id)}
            >
              Details
            </Button>
          </div>
        </div>
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
      {admin ? (
        <div className="mt-1 self-end">
          <Input
            type="text"
            value={userIDFilter}
            onChange={(e) => setUserIDFilter(e.target.value)}
            label="userID"
            className="self-end"
          />
        </div>
      ) : null}
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
      {
        <div className="self-end">
          <Pagination
            itemsPerPage={logsPerPage}
            totalItems={filteredLogs.length}
            paginate={paginate}
          />
        </div>
      }
    </div>
  );
};

export default LogList;
