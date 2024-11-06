import { Card, Avatar, Typography } from "@material-tailwind/react";
import { useGetInfoQuery } from "../slices/authApiSlice";
import { useEffect } from "react";

const ProfilePage = () => {
  const { data: user, isLoading } = useGetInfoQuery();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col items-center p-4 sm:p-8 lg:p-12">
      <div className="flex w-full max-w-5xl flex-col lg:flex-row lg:items-start">
        {/* Avatar Section */}
        <div className="flex justify-center lg:mr-8 lg:justify-start">
          <Avatar
            src={user.user.avatar}
            className="mb-6 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-60 lg:w-60"
          />
        </div>

        {/* Account Information Section */}
        <div className="flex w-full flex-col lg:w-2/3">
          <Card className="mb-6 bg-gray-100/50 p-4 text-center shadow-md lg:text-left">
            <Typography variant="h5" className="font-bold text-red-400">
              Account Information
            </Typography>
          </Card>

          {/* User Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="flex flex-col items-center bg-white p-4 shadow-md lg:items-start">
              <Typography
                variant="h6"
                className="mb-2 font-bold text-blue-600 underline"
              >
                User Name
              </Typography>
              <Typography variant="h6" className="font-normal text-gray-700">
                {user.user.firstName} {user.user.lastName}
              </Typography>
            </Card>

            <Card className="flex flex-col items-center bg-white p-4 shadow-md lg:items-start">
              <Typography
                variant="h6"
                className="mb-2 font-bold text-blue-600 underline"
              >
                Role
              </Typography>
              <Typography variant="h6" className="font-normal text-gray-700">
                {user.user.role}
              </Typography>
            </Card>

            <Card className="flex flex-col items-center bg-white p-4 shadow-md lg:items-start">
              <Typography
                variant="h6"
                className="mb-2 font-bold text-blue-600 underline"
              >
                Email
              </Typography>
              <Typography
                variant="h6"
                className="break-words text-center font-normal text-gray-700"
              >
                {user.user.email}
              </Typography>
            </Card>

            <Card className="flex flex-col items-center bg-white p-4 shadow-md lg:items-start">
              <Typography
                variant="h6"
                className="mb-2 font-bold text-blue-600 underline"
              >
                Page Balance
              </Typography>
              <Typography variant="h6" className="font-normal text-gray-700">
                {user.user.pageBalance}
              </Typography>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
