import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ElearningContext } from "../context/ElearningContext";

const ProtectLoggedIn = ({ children }) => {
  axios.defaults.withCredentials = true;
  const { cookie } = useContext(ElearningContext);

  if (cookie?.authenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectLoggedIn;
