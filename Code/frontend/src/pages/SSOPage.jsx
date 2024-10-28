import logo from "../assets/logo.png";
import {
  Typography,
  Card,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

const SSOPage = () => {
  return (
    <div className="h-screen rounded-md bg-[#eeeeee] pt-5">
      <Card className="m-auto grid w-10/12 grid-rows-4">
        <div className="flex items-center gap-5 rounded-lg bg-[#210f7a] p-3">
          <img src={logo} alt="logo" className="w-16" />
          <Typography variant="h3" color="white">
            Central Authentication Service
          </Typography>
        </div>
        <div className="row-span-3 grid grid-cols-5 gap-5 p-3">
          <form className="col-span-2 w-full bg-[#eeeeee] p-5">
            <Typography variant="h5" className="text-[#990033]">
              Enter your Username and Password
            </Typography>
            <hr className="my-2 h-0.5 border-t-0 bg-[#dddddd] opacity-100 dark:opacity-50" />
            <div className="flex flex-col gap-3">
              <Typography variant="h6" color="gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="md"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="md"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  Warn me before logging me into other sites.
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <hr className="my-2 h-0.5 border-t-0 bg-[#dddddd] opacity-100 dark:opacity-50" />
            <div className="-mt-3 mb-3 flex gap-3">
              <Button
                size="sm"
                className="mt-6 bg-[#006dcc] text-sm normal-case"
              >
                Login
              </Button>
              <Button
                size="sm"
                className="mt-6 bg-[#006dcc] text-sm normal-case"
              >
                Clear
              </Button>
            </div>
            <a href="#" className="font-medium">
              Change Password?
            </a>
          </form>
          <div className="col-span-3 flex flex-col gap-5 pe-2">
            <div>
              <Typography variant="h6" className="text-[#990033]">
                Languages
              </Typography>
              <Typography className="flex gap-2">
                <a href="">Vietnamese</a>
                <span>|</span>
                <a href="">English</a>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="text-[#990033]">
                Please note
              </Typography>
              <div className="flex flex-col gap-2">
                <Typography variant="paragraph" className="text-justify">
                  The Login page enables single sign-on to multiple websites at
                  HCMUT. This means that you only have to enter your user name
                  and password once for websites that subscribe to the Login
                  page.
                </Typography>
                <Typography variant="paragraph" className="text-justify">
                  You will need to use your HCMUT Username and password to login
                  to this site. The HCMUT account provides access to many
                  resources including the HCMUT Information System, e-mail, ...
                </Typography>
                <Typography variant="paragraph" className="text-justify">
                  For security reasons, please Exit your web browser when you
                  are done accessing services that require authentication!
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="h6" className="text-[#990033]">
                Technical support
              </Typography>
              <Typography className="flex gap-2">
                <div>
                  E-mail:{" "}
                  <a href="mailto:support@hcmut.edu.vn">support@hcmut.edu.vn</a>
                </div>
                <span>|</span>
                <a href="">Tel: (84-8) 38647256 - 5200</a>
              </Typography>
            </div>
          </div>
        </div>
      </Card>
      <footer className="m-auto w-10/12 pt-5">
        <Typography color="gray">
          Copyright © 2011 - 2012 Ho Chi Minh University of Technology. All
          rights reserved.
        </Typography>
        <Typography color="gray">
          <a href="http://www.jasig.org/cas">Powered by Jasig CAS 3.5.1</a>
        </Typography>
      </footer>
    </div>
  );
};

export default SSOPage;
