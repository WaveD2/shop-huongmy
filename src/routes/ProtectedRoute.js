import React from "react";
import useAuth from "../custom-hook/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = useAuth();
  //check admin
  //currentUser.email.toSting() === "waved@gmail.com"
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
