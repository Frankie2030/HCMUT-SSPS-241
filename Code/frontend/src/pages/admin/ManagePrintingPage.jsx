import { VerticalTabs } from "../../components/ManagePrintingPage/VerticalTab.jsx";
import ButtonList from "../../components/ManagePrintingPage/ButtonList.jsx";
import { Typography } from "@material-tailwind/react";
import FormPaper from "../../components/FormPaper.jsx";
import Report from "../../components/Report.jsx";

import {
  Cog6ToothIcon,
  Cog8ToothIcon,
  MapIcon,
} from "@heroicons/react/24/solid";

const ManagePrintingPage = () => {
  const createTabItem = (label, value, icon, desc) => ({
    label,
    value,
    icon,
    desc,
  });

  const tabItems = [
    createTabItem(
      "Cài đặt loại file in",
      "1",
      <MapIcon className="h-5 w-5" />,
      <ButtonList />,
    ),
    createTabItem(
      "Cài đặt tặng giấy",
      "2",
      <Cog6ToothIcon className="h-5 w-5" />,
      <FormPaper />,
    ),
    createTabItem(
      "Xuất báo cáo",
      "3",
      <Cog8ToothIcon className="h-5 w-5" />,
      <Report />,
    ),
  ];
  return (
    <div>
      <div>
        <Typography variant="h3" className="font-bold ">
          MANAGE PRINTING
        </Typography>
      </div>
      <VerticalTabs item={tabItems} />
    </div>
  );
};

export default ManagePrintingPage;
