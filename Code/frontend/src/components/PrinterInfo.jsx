import { Card, Input, IconButton, Typography } from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const PrinterInfo = ({
  ID,
  location,
  number,
  queue,
  brand,
  description,
  status,
}) => {
  return (
    <Card color="transparent" shadow={false}>
      <div className="mt-8 flex justify-between p-2">
        <Typography variant="h6" color="blue-gray">
          Thông tin máy in
        </Typography>
        <IconButton variant="text">
          <ArrowUturnLeftIcon className=" w-5 " />
        </IconButton>
      </div>
      <form className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 p-2 md:grid-cols-2">
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Mã máy
          </Typography>
          <Input
            disabled
            value={ID}
            className=" border-none bg-gray-200 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Hãng máy
          </Typography>
          <Input
            disabled
            value={brand}
            className=" border-none bg-gray-200 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Vị trí (Cơ sở - tòa - phòng)
          </Typography>
          <Input
            disabled
            value={location}
            className=" border-none bg-gray-200 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Mô tả
          </Typography>
          <Input
            disabled
            value={description}
            className=" border-none bg-gray-200 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Số hiệu
          </Typography>
          <Input
            disabled
            value={number}
            className=" border-none bg-gray-200 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Trạng thái
          </Typography>
          <Input
            disabled
            value={status}
            className=" border-none bg-gray-200 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray" className="-mb-2">
            Hàng chờ
          </Typography>
          <Input
            disabled
            value={queue}
            className=" border-none bg-gray-200 placeholder:text-gray-400"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
      </form>
    </Card>
  );
};

export default PrinterInfo;
