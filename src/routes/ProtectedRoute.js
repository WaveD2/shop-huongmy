import React from "react";
import useAuth from "../custom-hook/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = useAuth();
  const checkEmailAdmin = currentUser?.email === "admin_shop37@gmail.com";
  const result = checkEmailAdmin || currentUser;
  console.log(result);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
