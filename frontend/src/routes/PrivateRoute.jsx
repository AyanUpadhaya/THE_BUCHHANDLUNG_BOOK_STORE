import useAuth from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import useLoadUser from "../hooks/useLoadUser";
import { useEffect, useState } from "react";
export default function PrivateRoute({ role, children }) {
  const { user } = useAuth();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== role) {
    return <h2>PAGE Access denied</h2>;
  }

  return children;
}
