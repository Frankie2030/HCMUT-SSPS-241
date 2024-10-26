// frontend/src/App.jsx
import React from "react";

const App = () => {
  const [message, setMessage] = React.useState("");

  // Fetch message from backend
  React.useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend-Backend Connection Test</h1>
      <p>{message || "Loading message from backend..."}</p>
    </div>
  );
};

export default App;
