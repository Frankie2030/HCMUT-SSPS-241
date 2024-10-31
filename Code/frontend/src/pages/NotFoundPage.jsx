// src/pages/NotFoundPage.jsx
import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button color="blue" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
