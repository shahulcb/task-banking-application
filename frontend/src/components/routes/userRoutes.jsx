import React from "react";
import { Route } from "react-router-dom";
import Home from "../user/Home";
import ProtectedRoute from "../auth/ProtectedRoute";
import AccountDetails from "../user/AccountDetails";
import Transaction from "../user/Transaction";
import TransactionHistory from "../user/TransactionHistory";

const userRoutes = () => {
  return (
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole={"user"}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account_details"
        element={
          <ProtectedRoute requiredRole={"user"}>
            <AccountDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction"
        element={
          <ProtectedRoute requiredRole={"user"}>
            <Transaction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction_history"
        element={
          <ProtectedRoute requiredRole={"user"}>
            <TransactionHistory />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default userRoutes;
