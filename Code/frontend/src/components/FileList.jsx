import filetype from "../assets/filetypeicon/filetype";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useState } from "react";

const statusIcon = {
  verified: <CheckIcon className="w-5" />,
  notVerified: <ExclamationTriangleIcon className="w-5" />,
};

const statusColor = {
  verified: "bg-green-500",
  notVerified: "bg-yellow-500",
};

const FileItem = ({ file }) => {
  const date = new Date(file.uploadTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return (
    <Card
      className={`mx-1/8 mb-[30px] grid h-40 w-full grid-cols-11 gap-5 p-5`}
    >
      <div className="col-span-1">
        <img src={filetype[file.type]} alt="" className="w-full p-[10px]" />
      </div>
      <div className="col-span-3">
        <div className="h-full grid-rows-2">
          <p className="flex h-1/2 items-center truncate font-semibold">
            {file.name.substring(0, 60)}
          </p>
          {file.pageNum === 0 ? null : (
            <p className="flex h-1/2 items-center font-semibold">
              Số trang: {file.pageNum}
            </p>
          )}
        </div>
      </div>
      <div className="col-span-5 flex flex-col justify-between">
        <div className="w-full">
          <p>Máy in: {file.printerId}</p>
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
            In
          </Button>
        </Link>
      </div>
    </Card>
  );
};

const FileList = ({ files }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files
    ?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-5">
      {currentItems?.map((file) => {
        return <FileItem key={file._id} file={file} />;
      })}
      <div className="self-end">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={files?.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default FileList;
