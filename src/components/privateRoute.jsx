import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
//   const { user } = useSelector((state) => state.login);
  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
