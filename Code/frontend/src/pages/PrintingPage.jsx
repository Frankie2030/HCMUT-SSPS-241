import { Typography } from "@material-tailwind/react";
import { VerticalTabs } from "../components/ManagePrintingPage/VerticalTab";
import {
  ListBulletIcon,
  ClipboardDocumentIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import PrinterList from "../components/PrinterList";
import FileList from "../components/FileList";
import BuyPaper from "../components/BuyPaper";
import { useGetPrinterQuery } from "../slices/printerApiSlice";
import { useGetFilesByUserQuery } from "../slices/fileApiSlice";

const PrintingPage = () => {
  const { data: printers, isLoading: isPrintersLoading } = useGetPrinterQuery();
  const { data: files, isLoading: isFilesLoading } = useGetFilesByUserQuery();

  const createTabItem = (label, value, icon, desc) => ({
    label,
    value,
    icon,
    desc,
  });

  const tabItems = printers
    ? [
        createTabItem(
          "Printer List",
          "1",
          <ClipboardDocumentIcon className="w-10" />,
          <PrinterList printers={printers} canSelect={true} />,
        ),
        createTabItem(
          "File List",
          "2",
          <ListBulletIcon className="w-10" />,
          <FileList files={files} printers={printers} />, // Pass printers to FileList
        ),
        createTabItem(
          "Buying Pages",
          "3",
          <ShoppingCartIcon className="w-10" />,
          <BuyPaper />,
        ),
      ]
    : [];

  return isPrintersLoading || isFilesLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Typography variant="h4">PRINT NOW</Typography>
      <VerticalTabs item={tabItems} />
    </>
  );
};

export default PrintingPage;
