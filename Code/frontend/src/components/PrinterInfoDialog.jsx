import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
  Input,
  Textarea
} from "@material-tailwind/react";

const PrinterInfoDialog = ({ open, handleOpen, printer }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Thông tin máy in</DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <Card color="transparent" shadow={false}>
          <form className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 p-2 md:grid-cols-2">
            <div className="mb-1 flex flex-col gap-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Mã máy
              </Typography>
              <Input
                disabled
                value={printer._id}
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
                value={printer.brand}
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
                value={`${printer.location.campus} - ${printer.location.building} - ${printer.location.room}`}
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
                value={`${printer.number}`}
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
                value={`${printer.status}`}
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
                value={`${printer.queue}`}
                className=" border-none bg-gray-200 placeholder:text-gray-400"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-4 col-span-2">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Mô tả
              </Typography>
              <Textarea
                disabled
                value={`${printer.description}`}
                className=" border-none bg-gray-200 placeholder:text-gray-400"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </form>
        </Card>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="blue" onClick={handleOpen}>
          <span>OK</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PrinterInfoDialog;
