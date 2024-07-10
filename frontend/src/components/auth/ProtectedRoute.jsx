import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (requiredRole === "admin" && user?.role !== "admin" && isAdminRoute) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "user" && user?.role === "admin" && !isAdminRoute) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  //   if (admin && user?.role !== "admin") {
  //     return <Navigate to={"/"} replace />;
  //   }
  return children;
};

export default ProtectedRoute;
