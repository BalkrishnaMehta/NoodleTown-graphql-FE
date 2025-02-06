import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function AuthRoute() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (accessToken) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
