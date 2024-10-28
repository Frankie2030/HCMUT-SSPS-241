import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";
import CookieDialog from "../components/Dialog";

const LoginPage = () => {
  const [language, setLanguage] = useState("vie");

  const handleClick = async (role) => {
    window.location.href = `http://localhost:5000/auth/role?role=${encodeURIComponent(
      role,
    )}`;
  };

  const handleLanguageChange = (event) => {
    setLanguage(event);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#e2e6e9]">
      <Card className="my-10 w-[475px] px-5 py-10">
        <img src={logo} alt="logo" className="w-36 self-center pb-10" />
        <hr className="my-1 h-0.5 border-t-0 bg-[#ebf1f5] opacity-100 dark:opacity-50" />
        <CardBody className="flex flex-col gap-2">
          <Typography variant="h6">
            {language === "vie" ? "Đăng nhập dành cho" : "Login for"}
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            className="font-normal"
            size="md"
            onClick={() => handleClick("customer")}
          >
            {language === "vie"
              ? "Cán bộ / Sinh viên trường ĐH Bách Khoa Tp.HCM"
              : "Staff / Students of HCMUT"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className="font-normal"
            onClick={() => handleClick("SPSO")}
          >
            {language === "vie"
              ? "Nhân viên dịch vụ in ấn sinh viên - SPSO"
              : "Student Printing Services Officer - SPSO"}
          </Button>
          <Button variant="outlined" fullWidth className="font-normal">
            {language === "vie"
              ? "Quản trị hệ thống / Người dùng khác"
              : "System Administrator / Other Users"}
          </Button>
        </CardBody>
        <hr className="my-1 h-0.5 border-t-0 bg-[#ebf1f5] opacity-100 dark:opacity-50" />
        <CardFooter className="grid grid-cols-5 pt-5">
          <Select
            size="md"
            label="Select Language"
            onChange={handleLanguageChange}
          >
            <Option value="eng">English</Option>
            <Option value="vie">Vietnamese</Option>
          </Select>
          <div className="col-span-2 col-start-4">
            <CookieDialog />
          </div>
        </CardFooter>
      </Card>
      <Footer />
    </div>
  );
};

export default LoginPage;
