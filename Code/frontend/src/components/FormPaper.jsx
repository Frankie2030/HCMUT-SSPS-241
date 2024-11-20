import { useEffect, useState } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import {
  useGetDefaultsQuery,
  useUpdateDefaultsMutation,
} from "../slices/configApiSlice";

const FormPaper = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // New state for time
  const [updateDefaults] = useUpdateDefaultsMutation();
  const { data: defaults } = useGetDefaultsQuery();

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const [numericValue, setNumericValue] = useState("");

  const handleNumericChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumericValue(value);
  };

  useEffect(() => {
    if (defaults?.defaultPages) setNumericValue(defaults?.defaultPages);
    if (defaults?.distributionDates) {
      // const date = new Date(defaults?.distributionDates);
      // setSelectedDate(date.toISOString().slice(0, 10));
      const dateTime = new Date(defaults?.distributionDates);
      setSelectedDate(dateTime.toISOString().slice(0, 10)); // Extract date (YYYY-MM-DD)
      setSelectedTime(dateTime.toISOString().slice(11, 16)); // Extract time (HH:mm)
    }
  }, [defaults]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    // Combine date and time
    const localDateTime = new Date(`${selectedDate}T${selectedTime}`);

    // Convert localDateTime to UTC manually if you want to save it in local timezone
    const utcDateTime = new Date(
      localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000,
    );

    console.log("Local Time (ISO):", localDateTime.toISOString());
    console.log("UTC Time (ISO):", utcDateTime.toISOString());

    try {
      // Update the defaults with the UTC date-time and default pages
      await updateDefaults({
        defaultPages: numericValue,
        distributionDates: utcDateTime.toISOString(), // Save UTC time
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
