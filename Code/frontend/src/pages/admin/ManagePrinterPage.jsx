import { VerticalTabs } from "../../components/ManagePrintingPage/VerticalTab.jsx";
import { Typography } from "@material-tailwind/react";
import {
  PlusCircleIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import AddPrinter from "../../components/AddPrinter.jsx";
import PrinterList from "../../components/PrinterList.jsx";
import { useGetPrinterQuery } from "../../slices/printerApiSlice";

const ManagePrinterPage = () => {
  const { data: printers } = useGetPrinterQuery();

  const createTabItem = (label, value, icon, desc) => ({
    label,
    value,
    icon,
    desc,
  });

  const tabItems = [
    createTabItem(
      "Printer List",
      "1",
      <PlusCircleIcon className="w-10" />,
      <PrinterList printers={printers} canSelect={false} />,
    ),
    createTabItem(
      "Add more Printers",
      "2",
      <ClipboardDocumentIcon className="w-10" />,
      <AddPrinter />,
    ),
  ];

  return (
    <>
      <Typography variant="h4">MANAGE PRINTER</Typography>
      <VerticalTabs item={tabItems} />
    </>
  );
};

export default ManagePrinterPage;
