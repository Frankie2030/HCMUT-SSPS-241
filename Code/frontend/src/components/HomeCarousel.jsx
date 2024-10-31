import { Carousel, Typography } from "@material-tailwind/react";
import { carousel1, carousel2, carousel3, carousel4 } from "../assets/carousel";

const HomeCarousel = () => {
  return (
    <Carousel
      className="h-48 w-full md:mt-5 md:h-64 md:w-4/5 md:rounded-xl lg:h-96"
      autoplay={true}
      loop={true} // This line enables looping
    >
      <div className="relative h-full w-full">
        <img
          src={carousel1}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        {/* Previous structure:
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-5 w-2/3 md:w-1/2">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              We are pleased to bring smart printing solutions
            </Typography>
          </div>
        </div>
        */}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50">
          <div className="w-2/3 text-center md:w-1/2">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-center text-lg md:text-xl lg:text-2xl"
            >
              We are pleased to bring smart printing solutions to the School and
              the Students
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
        {/* Previous structure:
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-4 w-4/5 md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              SPSS is a reliable companion
            </Typography>
          </div>
        </div>
        */}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50">
          <div className="w-4/5 text-center md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-center text-lg md:text-xl lg:text-2xl"
            >
              SPSS is a reliable companion
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
        {/* Previous structure:
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-4 w-4/5 md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              Providing the best user experience
            </Typography>
          </div>
        </div>
        */}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50">
          <div className="w-4/5 text-center md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-center text-lg md:text-xl lg:text-2xl"
            >
              Providing the best experience
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
        {/* Previous structure:
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="ms-4 w-4/5 md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-lg md:text-xl lg:text-2xl"
            >
              Print documents anytime at your school
            </Typography>
          </div>
        </div>
        */}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50">
          <div className="w-4/5 text-center md:w-2/4 lg:w-1/3">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-center text-lg md:text-xl lg:text-2xl"
            >
              Print documents anytime at your school
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
