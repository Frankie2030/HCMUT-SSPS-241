import { Link } from "react-router-dom";
import { useState, useEffect, cloneElement } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  HomeIcon,
  PrinterIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ClockIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import ProfileMenu from "./ProfileMenu";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const role = useSelector((state) => state.auth.userData.role);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, [role]);

  const handleNavItemClick = () => {
    setOpenNav(false); // Close the menu when a nav item is clicked
  };

  const generateNavItem = (icon, to, text) => (
    <Typography
      as="li"
      variant="small"
      color="white"
      className="flex items-center gap-x-2 p-1 font-bold"
    >
      {icon && cloneElement(icon, { className: "w-6" })}
      <Link to={to} className="flex items-center" onClick={handleNavItemClick}>
        {text}
      </Link>
    </Typography>
  );

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-14">
      {role ? generateNavItem(<HomeIcon />, "/", "HOMEPAGE") : null}
      {role === "customer"
        ? generateNavItem(<ClockIcon />, "/history", "PRINTING HISTORY")
        : role === "SPSO"
          ? generateNavItem(<PrinterIcon />, "/admin/printer-manage", "PRINTER")
          : generateNavItem(<UserIcon />, "/login", "LOGIN")}
      {role === "SPSO"
        ? generateNavItem(<CogIcon />, "/admin/printing-manage", "PRINTING")
        : role === "customer"
          ? generateNavItem(<PrinterIcon />, "/printing", "PRINT NOW")
          : null}
      {role === "SPSO"
        ? generateNavItem(<ClockIcon />, "/admin/history", "PRINTING HISTORY")
        : null}
      {role === "SPSO"
        ? generateNavItem(<UserIcon />, "/admin/user-list", "USER LIST")
        : null}
    </ul>
  );

  return (
    // <Navbar
    //   className="mx-auto bg-[#0373fc] px-4 py-2 text-white lg:px-8 lg:py-4"
    //   fullWidth={true}
    // >
    <Navbar
      className="mx-auto bg-blue-fill bg-cover px-4 py-2 text-white lg:px-8 lg:py-4"
      fullWidth={true}
    >
      <div className="flex w-full items-center justify-between text-blue-gray-900">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={handleNavItemClick}
        >
          <img className="w-12 md:w-16" src={logo} alt="logo" />
          <div className="hidden flex-col md:flex">
            <Typography
              variant="small"
              color="white"
              className="text-xs md:text-sm"
            >
              HO CHI MINH CITY UNIVERSITY OF TECHNOLOGY (HCMUT)
            </Typography>
            <Typography
              variant="small"
              color="white"
              className="text-sm font-bold md:text-base"
            >
              STUDENT SMART PRINTING SERVICES
            </Typography>
          </div>
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          {navList}
          {role ? <ProfileMenu /> : null}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="w-6" />
          ) : (
            <Bars3Icon className="w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav} className="lg:hidden">
        <div className="container mx-auto flex flex-col gap-4">
          <div className="mb-4 flex justify-end">{role && <ProfileMenu />}</div>
          {navList}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
