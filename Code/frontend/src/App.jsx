import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetInfoQuery } from "./slices/authApiSlice";
import { setCredentials } from "./slices/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { Outlet } from "react-router-dom";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UserListPage from "./pages/UserListPage"; // Import the new page

// const App = () => {
//   const dispatch = useDispatch();
//   const { data: user, isLoading } = useGetInfoQuery();

//   useEffect(() => {
//     if (!isLoading) {
//       dispatch(setCredentials({ ...user?.user }));
//     }
//   }, [user, dispatch, isLoading]);

//   return (
//     <>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <>
//           <Header />
//           <main className="min-h-screen bg-white-fill bg-cover bg-center p-10">
//             <Outlet />
//           </main>
//           <Footer />
//         </>
//       )}
//     </>
//   );
// };

const App = () => {
  const dispatch = useDispatch();
  const { data: user } = useGetInfoQuery();

  // Simulate loading state with delay
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // End loading after 2 seconds
      if (user) {
        dispatch(setCredentials({ ...user?.user }));
      }
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timeout
  }, [user, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main className="min-h-screen bg-white-fill bg-cover bg-center p-10">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
