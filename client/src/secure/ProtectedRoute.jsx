import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ElearningContext } from "../context/ElearningContext";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  axios.defaults.withCredentials = true;
  const { user, updateAuthenticated, updateDetails, updateLoading, cookie } =
    useContext(ElearningContext);

  // const fetchUser = async () => {
  //   try {
  //     updateLoading(true);
  //     const response = await axios.get("http://localhost:3005/auth/fetchUser", {
  //       withCredentials: true,
  //     });

  //     const { _doc, isAuthenticated, success, message } = response.data;

  //     console.log(response.data);

  //     if (success) {
  //       updateAuthenticated(isAuthenticated);
  //       updateDetails(_doc);
  //     } else {
  //       toast.error(message);
  //     }

  //     updateLoading(false);
  //   } catch (error) {
  //     updateLoading(false);
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  if (!cookie?.authenticated) {
    toast.error("log in to access this page", { duration: 1000 });
    return <Navigate to="/LoginPage" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
