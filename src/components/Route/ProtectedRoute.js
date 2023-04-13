import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import BannedAccount from "../Error/BannedAccount";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  userLoadRequest,
  userLoadSuccess,
  userLoadFailed,
} from "../../features/user/userSlice";
import { userLoadReq } from "../../apis/index";

export default function ProtectedRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoadRequest());
    userLoadReq()
      .then((res) => {
        dispatch(userLoadSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userLoadFailed(err.response));
      });
  }, []);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (user && isAuthenticated && user.user.role === "banned") {
    return <Navigate to="/banned" />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/401" />;
}
