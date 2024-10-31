import { Card, Avatar, Typography } from "@material-tailwind/react";
const parentStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10vh",
};
import { useGetInfoQuery } from "../slices/authApiSlice";
import { useEffect } from "react";

const ProfilePage = () => {
  const { data: user, isLoading } = useGetInfoQuery();

  useEffect(() => {
    console.log(user);
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="grid grid-flow-col grid-rows-6 gap-10">
      <Avatar src={user.user.avatar} className="row-span-6 m-10 h-60 w-60" />
      <div className="col-span-9" />
      <div className="col-span-8">
        <Card className=" col-span-2 col-start-4 row-span-1 bg-gray-100/50	">
          <Typography
            variant="h3"
            className="flex-none font-bold text-red-400/100"
            style={parentStyle}
          >
            Account Information
          </Typography>
        </Card>
      </div>
      <Card className="col-span-4 row-span-2">
        <Typography
          variant="h4"
          className="flex-none font-bold text-blue-600/90 underline"
          style={parentStyle}
        >
          User Name
        </Typography>
        <Typography
          variant="h4"
          className="flex-none font-normal"
          style={parentStyle}
        >
          {user.user.firstName} {user.user.lastName}
        </Typography>
      </Card>
      <Card className="col-span-4 row-span-2">
        <Typography
          variant="h4"
          className="flex-none font-bold text-blue-600/90 underline"
          style={parentStyle}
        >
          Role
        </Typography>
        <Typography
          variant="h4"
          className="flex-none font-normal"
          style={parentStyle}
        >
          {user.user.role}
        </Typography>
      </Card>
      <Card className="col-span-4 row-span-2">
        <Typography
          variant="h4"
          className="flex-none font-bold text-blue-600/90 underline"
          style={parentStyle}
        >
          Email
        </Typography>
        <Typography
          variant="h4"
          className="flex-none font-normal"
          style={parentStyle}
        >
          {user.user.email}
        </Typography>
      </Card>
      <Card className="col-span-4 row-span-2">
        <Typography
          variant="h4"
          className="flex-none font-bold text-blue-600/90 underline"
          style={parentStyle}
        >
          Page Balance
        </Typography>
        <Typography
          variant="h4"
          className="flex-none font-normal"
          style={parentStyle}
        >
          {user.user.pageBalance}
        </Typography>
      </Card>
    </div>
  );
};

export default ProfilePage;
