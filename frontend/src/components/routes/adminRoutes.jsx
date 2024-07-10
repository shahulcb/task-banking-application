import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import UserDetails from "../admin/UserDetails";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole={"admin"}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard/users/:id"
        element={
          <ProtectedRoute requiredRole={"admin"}>
            <UserDetails />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
