import {
  Card,
  Avatar,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useGetInfoQuery } from "../slices/authApiSlice";
import { useGetFilesQuery } from "../slices/fileApiSlice";
import { useGetBuyingLogsByUserQuery } from "../slices/buyingLogApiSlice";
import { useGetLogsQuery } from "../slices/logApiSlice";
import FileList from "../components/FileList";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const ProfilePage = () => {
  const { data: user, isLoading } = useGetInfoQuery();
  const { data: files = [], isLoading: isFilesLoading } = useGetFilesQuery();
  const { data: logs = [], isLoading: isLogsLoading } = useGetLogsQuery();
  const { data: buyingLogs = [], isLoading: isLogsLoadingBuying } =
    useGetBuyingLogsByUserQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortedFiles, setSortedFiles] = useState([]);
  const [sortOption, setSortOption] = useState("uploadTime");

  useEffect(() => {
    const sorted = [...files].sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "uploadTime")
        return new Date(b.uploadTime) - new Date(a.uploadTime);
      return 0;
    });
    setSortedFiles(
      sorted.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [files, sortOption, searchTerm]);

  const totalPrintedFiles = logs?.filter(
    (log) => log.status === "completed",
  ).length;
  const totalPrintedCopies = logs?.reduce((total, log) => {
    if (log.status === "completed") {
      return total + (log.printingProperties?.numberOfCopies || 0);
    }
    return total;
  }, 0);

  return isLoading || isFilesLoading || isLogsLoading || isLogsLoadingBuying ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center p-4 sm:p-8 lg:p-12">
      {/* User Information */}
      <div className="flex w-full max-w-5xl flex-col lg:flex-row lg:items-start">
        <div className="flex justify-center lg:mr-8 lg:justify-start">
          <Avatar
            src={user.user.avatar}
            className="mb-6 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-60 lg:w-60"
          />
        </div>

        <div className="flex w-full flex-col lg:w-2/3">
          <Card className="mb-6 bg-gray-100 p-4 text-center shadow-md">
            <Typography variant="h5" className="font-bold text-blue-600">
              Account Information
            </Typography>
          </Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                label: "User Name",
                value: `${user.user.firstName} ${user.user.lastName}`,
              },
              { label: "Role", value: user.user.role },
              { label: "Email", value: user.user.email },
              { label: "Page Balance", value: user.user.pageBalance },
            ].map((info, index) => (
              <Card
                key={index}
                className="flex flex-col items-center bg-white p-4 shadow-md lg:items-start"
              >
                <Typography
                  variant="h6"
                  className="mb-2 font-bold text-blue-600 underline"
                >
                  {info.label}
                </Typography>
                <Typography variant="h6" className="font-normal text-gray-700">
                  {info.value}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Show these sections only for 'customer' role */}
      {user.user.role === "customer" && (
        <>
          {/* Uploaded Files Section */}
          <div className="mt-8 w-full max-w-5xl">
            <Typography variant="h5" className="mb-4 font-bold text-blue-600">
              Uploaded Files
            </Typography>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Input
                placeholder="Search files by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
                label={<span style={{ color: "#1a202c" }}>Search</span>}
              />
              <Button
                variant="outlined"
                className="h-fit"
                onClick={() =>
                  setSortOption((prev) =>
                    prev === "uploadTime" ? "name" : "uploadTime",
                  )
                }
              >
                Sort by {sortOption === "uploadTime" ? "Name" : "Upload Time"}
              </Button>
            </div>
            <FileList files={sortedFiles} printers={[]} />
          </div>

          {/* Printing Files Section */}
          <div className="mt-8 w-full max-w-5xl">
            <Typography variant="h5" className="mb-4 font-bold text-blue-600">
              Printing Files
            </Typography>
            <Card className="bg-gray-100 p-4 shadow-md">
              <Typography variant="h6" className="mb-2 text-gray-700">
                Total Files Printed: {totalPrintedFiles}
              </Typography>
              <Typography variant="h6" className="text-gray-700">
                Total Copies Printed: {totalPrintedCopies}
              </Typography>
            </Card>
          </div>

          {/* Buying History Section */}
          <div className="mt-8 w-full max-w-5xl">
            <Typography variant="h5" className="mb-4 font-bold text-blue-600">
              Buying History
            </Typography>
            <Card className="bg-gray-100 p-4 shadow-md">
              <div className="overflow-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200 text-left text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="border border-gray-200 px-4 py-2">
                        Quantity
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Combo
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Total Amount
                      </th>
                      <th className="border border-gray-200 px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyingLogs.map((log) => (
                      <tr key={log._id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">
                          {log.quantity} A4 pages
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {log.combo || "No Combo"}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          đ{log.totalAmount}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
