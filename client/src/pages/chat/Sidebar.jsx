import React from "react";
import { ImSearch } from "react-icons/im";
import MoreUsers from "./MoreUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Divider, Typography } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ width: "250px" }}
      className="border-r border-slate-500 p-4 flex flex-col"
    >
      {/* <form action="" className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered rounded-md bg-white"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-500">
          <ImSearch />
        </button>
      </form> */}
      <Typography variant="h6">Chat Members</Typography>
      <Divider />
      <div className="divider px-3"></div>
      <MoreUsers />
    </div>
  );
};

export default Sidebar;
