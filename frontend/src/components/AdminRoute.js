import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.user.isAdmin ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.user.isAdmin ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
