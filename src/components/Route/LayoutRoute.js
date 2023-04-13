import { Container, Box } from "@mui/material";
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

export default function LayoutRoute() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}
