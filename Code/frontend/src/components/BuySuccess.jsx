
import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

  const BuySuccess = ({ orderID }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogBody>
        <div className="w-full flex rounded-lg px-[5%] py-[3%]">
            <div className="w-[70%]">
                <p className="text-2xl">Cảm ơn bạn đã lựa chọn dịch vụ in ấn thông minh</p>
                <div className="flex text-[#0b3ba4] font-semibold">
                    <div className="w-1/5 py-[5%] pr-[5%]">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="w-4/5 flex items-center">
                        <p>Mua giấy thành công</p>
                    </div>
                </div>
                <div className="flex">
                    <p>Bạn có thể xem lại tại</p>
                    <a href="" className="text-[#0b3ba4] px-[10px] font-semibold hover:opacity-60">lịch sử mua giấy</a>
                </div>
                <div className="flex">
                    <p>Thông tin chi tiết về dịch vụ vui lòng liên hệ</p>
                    <a href="mailto:hcmut_spss@hcmut.edu.vn" className="text-[#0b3ba4] px-[10px] font-semibold hover:opacity-60">hcmut_spss@hcmut.edu.vn</a>
                </div>
                <div className="flex">
                    <p>Nếu muốn góp ý về dịch vụ chọn tiện ích bạn vào</p>
                    <a href="" className="text-[#0b3ba4] px-[10px] font-semibold hover:opacity-60">phản hồi</a>
                </div>
            </div>
            <div className="w-[30%] mt-[40px]">
                <p className="text-center mb-[10px]">Mã số đơn hàng của bạn:</p>
                <div className="rounded-full bg-[#0b3ba4] text-white text-center py-[30px] text-2xl font-semibold">{orderID}</div>
                <div className="flex mt-[40px]">
                    <div className="w-3/4"></div>
                    <a href="" className="text-[#0b3ba4] w-1/4 hover:opacity-60">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        </DialogBody>
      </Dialog>
    </>
    );
  };
  
  export default BuySuccess;
  