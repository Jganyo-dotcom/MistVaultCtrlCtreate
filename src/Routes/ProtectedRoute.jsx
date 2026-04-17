import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = () => localStorage.getItem("authenticated") === "true";

function ProtectedRoute() {
  const location = useLocation();

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
