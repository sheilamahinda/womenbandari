import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { selectedGridRowsCountSelector } from "@mui/x-data-grid";
import { ElearningContext } from "../context/ElearningContext";

const useGetMessages = () => {
  const { _id } = useContext(ElearningContext);
  const { selectedUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  //          `http://localhost:3005/api/v1/message/${selectedUser?._id}`

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:3005/api/v1/message/${selectedUser?._id}`
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUser?._id, setMessages]);
};

export default useGetMessages;
