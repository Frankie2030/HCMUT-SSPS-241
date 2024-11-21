import { useEffect, useState } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import {
  useGetDefaultsQuery,
  useUpdateDefaultsMutation,
} from "../slices/configApiSlice";

const FormPaper = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // New state for time
  const [numericValue, setNumericValue] = useState("");
  const [updateDefaults] = useUpdateDefaultsMutation();
  const { data: defaults } = useGetDefaultsQuery();

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleNumericChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setNumericValue(value);
  };

  // Convert a date to the Vietnam timezone (for display purposes)
  const convertToVietnamTime = (date) => {
    const timeZone = "Asia/Ho_Chi_Minh";
    return new Date(date.toLocaleString("en-US", { timeZone }));
  };

  useEffect(() => {
    if (defaults?.defaultPages) setNumericValue(defaults?.defaultPages);
    if (defaults?.distributionDates) {
      const utcDate = new Date(defaults.distributionDates); // UTC time from the server
      const vietnamTime = convertToVietnamTime(utcDate); // Convert to Vietnam time for display
      setSelectedDate(vietnamTime.toISOString().slice(0, 10)); // Extract date (YYYY-MM-DD)
      setSelectedTime(vietnamTime.toTimeString().slice(0, 5)); // Extract time (HH:mm)
    }
  }, [defaults]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    // Combine the selected date and time into a local date-time object in Asia/Ho_Chi_Minh timezone
    const localDateTime = new Date(`${selectedDate}T${selectedTime}:00`); // User's local time
    console.log("Local Date Time (Asia/Ho_Chi_Minh):", localDateTime);

    // Adjust for the Asia/Ho_Chi_Minh timezone (+7 hours) to convert to UTC
    // const utcDateTime = new Date(localDateTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours
    // console.log("UTC Date Time for Storage:", utcDateTime);

    try {
      // Update the defaults with UTC time and default pages
      await updateDefaults({
        defaultPages: numericValue,
        // distributionDates: utcDateTime.toISOString(), // Store as UTC ISO string
        distributionDates: localDateTime.toISOString(), // Store as UTC ISO string
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating defaults:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <div style={{ width: "70%" }}>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 font-medium"
            style={{ fontWeight: "bold" }}
          >
            Choose date for giving pages
          </Typography>
          <Input
            placeholder="Select a date"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div style={{ width: "70%" }}>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 font-medium"
            style={{ fontWeight: "bold" }}
          >
            Choose time for giving pages
          </Typography>
          <Input
            placeholder="Select a time"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </div>

        <div style={{ width: "70%" }}>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 font-medium"
            style={{ fontWeight: "bold" }}
          >
            Number of free given pages
          </Typography>
          <Input
            maxLength={3}
            placeholder="Enter number"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            type="text"
            value={numericValue}
            onChange={handleNumericChange}
          />
        </div>
        <div className="justify-items-center">
          <Button
            style={{ marginTop: "2%" }}
            variant="gradient"
            color="blue"
            size="md"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormPaper;
