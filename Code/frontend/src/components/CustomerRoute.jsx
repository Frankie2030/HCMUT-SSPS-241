import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerRoute = () => {
  const { role } = useSelector((state) => state.auth.userData);
  return role === "customer" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default CustomerRoute;
