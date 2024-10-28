import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import React from "react";
import { List, ListItem, Card } from "@material-tailwind/react";
import { ListItemPrefix, Avatar, Typography } from "@material-tailwind/react";

const Filter = ({handleClick,inputMSSV,setMSSV}) => {
  const Date = () => {
    return (
      <div
        className="relative mb-3"
        data-te-datepicker-init
        data-te-input-wrapper-init
      >
        <input
          type="date"
          className="peer-focus:text-primary dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          placeholder="Select a date"
          data-te-datepicker-toggle-ref
          data-te-datepicker-toggle-button-ref
        />
        <label
          htmlFor="floatingInput"
          className="text-neutral-500 peer-focus:text-primary dark:text-neutral-200 dark:peer-focus:text-primary pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
        >
          Select a date
        </label>
      </div>
    );
  };
  const MSSV = () => {
    
    return (
      <div
        className="relative mb-3"
      >
        <input
          type="text"
          className="peer-focus:text-primary dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          placeholder="INPUT MSSV"
          data-te-datepicker-toggle-ref
          data-te-datepicker-toggle-button-ref
          value={inputMSSV} onChange={(e) => setMSSV(e.target.value)}
        />
        <label
          htmlFor="floatingInput"
          className="text-neutral-500 peer-focus:text-primary dark:text-neutral-200 dark:peer-focus:text-primary pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
        >
          INPUT MSSV
        </label>
      </div>
    );
  };
  
  
  function ListPrinter() {
    
    return (
      <Card className="w-96">
        <List>
          <ListItem  onClick={() => handleClick("CS2-1099")}>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="candice"
                src="src\assets\PrinterImage.png"
              />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                CS2-1099
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Tầng 2, tòa H1, cơ sở 2
              </Typography>
            </div>
          </ListItem>
          <ListItem onClick={() => handleClick("CS2-1089")}>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="alexander"
                src="src\assets\PrinterImage.png"
              />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                CS2-1089
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Tầng 2, tòa H1, cơ sở 2
              </Typography>
            </div>
          </ListItem>
          <ListItem onClick={() => handleClick("CS1-1099")}>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="emma"
                src="src\assets\PrinterImage.png"
              />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                CS1-1099
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Tầng 2, tòa B1, cơ sở 1
              </Typography>
            </div>
          </ListItem>
        </List>
      </Card>
    );
  }
  
  const PopPrinters = () => {
    return (
      <Popover placement="bottom-end" className="p-0">
        <PopoverHandler>
          <button className="w-full">Danh sách máy in</button>
        </PopoverHandler>
        <PopoverContent className="z-20">
          <ListPrinter />
        </PopoverContent>
      </Popover>
    );
  };
  
  const PopMSSV =() =>
  {
    return (
      <Popover placement="bottom-end" className="p-0">
        <PopoverHandler>
          <button className="w-full">MSSV</button>
        </PopoverHandler>
        <PopoverContent className="z-20">
          <MSSV/>
        </PopoverContent>
      </Popover>
    );
  }
  
  const PopTime = () => {
    return (
      <Popover placement="bottom-end" className="p-0">
        <PopoverHandler>
          <button className="w-full">Nhập khoảng thời gian</button>
        </PopoverHandler>
        <PopoverContent className="z-20">
          <Date />
        </PopoverContent>
      </Popover>
    );
  };
  
  function FilterIcon() {
    return (  
      <svg
        className="text-white-600 h-6 w-6 p-0"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />{" "}
      </svg>
    );
  }
  
  function ListSPSO() {
    const [selected, setSelected] = React.useState(1);
    const setSelectedItem = (value) => setSelected(value);
  
    return (
      <Card className="w-46 z-20">
        <List>
          <ListItem
            selected={selected === 1}
            onClick={() => setSelectedItem(1)}
          >
           < PopMSSV/>
          </ListItem>
          <ListItem
            selected={selected === 1}
            onClick={() => {
              setSelectedItem(1);
              ListPrinter();
            }}
          >
            <PopPrinters />
          </ListItem>
          <ListItem selected={selected === 3} onClick={() => setSelectedItem(3)}>
            <PopTime />
          </ListItem>
        </List>
      </Card>
    );
  }
  
  function ListUser() {
    const [selected, setSelected] = React.useState(1);
    const setSelectedItem = (value) => setSelected(value);
  
    return (
      <Card className="w-46 z-20">
        <List>
          <ListItem
            selected={selected === 1}
            onClick={() => {
              setSelectedItem(1);
              ListPrinter();
            }}
          >
            <PopPrinters />
          </ListItem>
          <ListItem selected={selected === 2} onClick={() => setSelectedItem(2)}>
            <PopTime />
          </ListItem>
        </List>
      </Card>
    );
  }
  
  function ListWithSelectedItem({ typeUser }) {
    if (typeUser == "User") {
      return <ListUser />;
    } else {
      return <ListSPSO />;
    }
  }
  return (
    <>
    
    <Popover placement="bottom-end" className="p-0">
      <PopoverHandler>
        <button>
          <FilterIcon />
        </button>
      </PopoverHandler>
      <PopoverContent className="z-10">
        <span>Lựa chọn kiểu filter</span>
        <ListWithSelectedItem typeUser="spso" />
      </PopoverContent>
    </Popover>
    </>
  );
};

export default Filter;
