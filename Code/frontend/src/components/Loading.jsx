import React from "react";
import { PuffLoader, ClockLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ClockLoader color="#4A90E2" size={100} />
    </div>
  );
};

export default Loading;
