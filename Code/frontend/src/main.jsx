import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CustomerRoute from "./components/CustomerRoute";
import AdminRoute from "./components/AdminRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrintingPage from "./pages/PrintingPage";
import HistoryPage from "./pages/HistoryPage";
import ManagePrinterPage from "./pages/admin/ManagePrinterPage";
import ManagePrintingPage from "./pages/admin/ManagePrintingPage";
import FilePreviewPage from "./pages/FilePreviewPage.jsx";
import AdminHistoryPage from "./pages/admin/HistoryPage";
import UserListPage from "./pages/admin/UserListPage"; // Import the new page
import SSOPage from "./pages/SSOPage";
import NotFoundPage from "./pages/NotFoundPage"; // Import the 404 page component
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="" element={<CustomerRoute />}>
          <Route path="/printing" element={<PrintingPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/printing" element={<PrintingPage />} />
          <Route path="/preview/:id" element={<FilePreviewPage />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin/printer-manage" element={<ManagePrinterPage />} />
          <Route
            path="/admin/printing-manage"
            element={<ManagePrintingPage />}
          />
          <Route path="/admin/history" element={<AdminHistoryPage />} />
          <Route path="/admin/user-list" element={<UserListPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sso" element={<SSOPage />} />
      {/* Catch-all route for 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
