import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminMenu from "../Admin/AdminMenu";
import { Grid } from "@mui/material";

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated && user.user.role === "admin") {
    return (
      <>
        <AdminMenu>
          <Outlet />
        </AdminMenu>
      </>
    );
  } else if (isAuthenticated && user.user.role === "user") {
    return <Navigate to="/403" />;
  } else if (!isAuthenticated) {
    return <Navigate to="/401" />;
  }
}
