import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const ElearningContext = createContext(null);

const ElearningProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["authenticated"]);
  const [resources, setResources] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [grades, setGrades] = useState([]);
  const [processedGrade, setProcessedGrades] = useState({
    grades: {},
  });

  const deleteCookie = () => {
    removeCookie("authenticated", { path: "/" });
  };

  const setStorage = () => {
    setCookie("authenticated", "sessionActive", { maxAge: 3600, path: "/" });
  };

  const [user, setUser] = useState({
    isAuthenticated: false,
    details: {},
    profile: {},
  });

  const updateLoading = (state) => {
    setLoading(state);
  };

  const updateAuthenticated = (state) => {
    setUser((prev) => ({ ...prev, isAuthenticated: state }));
  };

  const updateDetails = (state) => {
    setUser((prev) => ({ ...prev, details: state }));
  };

  const username = window.localStorage.getItem("username");
  const role = window.localStorage.getItem("role");
  const adm = window.localStorage.getItem("adm");
  const _id = window.localStorage.getItem("_id");

  const values = {
    _id,
    adm,
    loading,
    updateLoading,
    updateAuthenticated,
    updateDetails,
    user,
    deleteCookie,
    setStorage,
    cookie,
    resources,
    setResources,
    username,
    role,
    recordings,
    setRecordings,
    grades,
    setGrades,
    processedGrade,
    setProcessedGrades,
  };

  return (
    <ElearningContext.Provider value={values}>
      {children}
    </ElearningContext.Provider>
  );
};

export default ElearningProvider;
