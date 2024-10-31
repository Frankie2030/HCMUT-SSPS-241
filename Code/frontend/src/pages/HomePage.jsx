import HomeCarousel from "../components/HomeCarousel";
import HomeCard from "../components/HomeCard";
import SimpleCard from "../components/SimpleCard";
import { Typography } from "@material-tailwind/react";
import {
  UserIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <HomeCarousel />
      <div className="mt-10 flex flex-col items-center gap-10">
        <Typography variant="h2" className="text-center text-2xl" color="blue">
          OUR SERVICES
        </Typography>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-20">
          <HomeCard
            text="Convenient and easy printing anytime, anywhere"
            imageUrl="bg-[url('https://images.unsplash.com/photo-1553605249-4dc77f76dddf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByaW50ZXJ8ZW58MHx8MHx8fDA%3D')]"
          />
          <HomeCard
            text="Review printing history"
            imageUrl="bg-[url('https://images.unsplash.com/photo-1533749047139-189de3cf06d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvY2t8ZW58MHx8MHx8fDA%3D')]"
          />
          <HomeCard
            text="Online payment, multi-platform support"
            imageUrl="bg-[url('https://images.unsplash.com/photo-1593672715438-d88a70629abe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uZXl8ZW58MHx8MHx8fDA%3D')]"
          />
        </div>
      </div>
      <div className="my-10 flex flex-col items-center gap-10">
        <Typography variant="h2" className="text-center text-2xl" color="blue">
          SSPS COMMITMENTS
        </Typography>
        <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <SimpleCard
            icon={<UserIcon className="w-28" />}
            headertext="USER-FRIENDLY"
            bodytext="Users can navigate the website with ease and minimal effort"
          />
          <SimpleCard
            icon={<DevicePhoneMobileIcon className="w-28" />}
            headertext="COMPATIBILITY"
            bodytext="Operates smoothly on multiple platforms and browsers"
          />
          <SimpleCard
            icon={<RocketLaunchIcon className="w-28" />}
            headertext="PERFORMANCE"
            bodytext="Handles multiple requests efficiently within a short period"
          />
          <SimpleCard
            icon={<LockClosedIcon className="w-28" />}
            headertext="SECURITY"
            bodytext="Ensures user information confidentiality, with no third-party disclosure"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
