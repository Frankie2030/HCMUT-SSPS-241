import { Carousel, Typography } from "@material-tailwind/react";
import { carousel1, carousel2, carousel3, carousel4 } from "../assets/carousel";

const HomeCarousel = () => {
  return (
    <Carousel
      className="h-48 w-full md:mt-5 md:h-64 md:w-4/5 md:rounded-xl lg:h-96"
      autoplay={true}
    >
      <div className="relative h-full w-full">
        <img
          src={carousel1}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-5 w-2/3 md:w-1/2">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              CHÚNG TÔI HÂN HẠNH MANG ĐẾN GIẢI PHÁP IN ẤN THÔNG MINH
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={carousel2}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-4 w-4/5 md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              SPSS LÀ NGƯỜI BẠN ĐỒNG HÀNH ĐÁNG TIN CẬY
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={carousel3}
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-4 w-4/5 md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              MANG TỚI NGƯỜI DÙNG TRẢI NGHIỆM TỐT NHẤT KHI SỬ DỤNG
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={carousel4}
          alt="image 4"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-4 w-4/5 md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              IN TÀI LIỆU MỌI LÚC NGAY TẠI TRƯỜNG CỦA BẠN
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
