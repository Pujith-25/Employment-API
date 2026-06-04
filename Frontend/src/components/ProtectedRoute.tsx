import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({
  children,
  allowedRoles
}: ProtectedRouteProps) => {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (
    !role ||
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;