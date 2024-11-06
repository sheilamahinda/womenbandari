import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";
import { Avatar, Divider, Typography, Box } from "@mui/material";

const SingleUsers = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <Box
        onClick={() => selectedUserHandler(user)}
        sx={{
          paddingBottom: "1rem",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          p: 1,
          bgcolor:
            selectedUser?._id === user?._id
              ? "primary.main"
              : "background.paper",
          "&:hover": {
            bgcolor: "grey.200",
          },
        }}
      >
        <Avatar
          src={user?.profilePhoto}
          alt={user?.fullName}
          sx={{ mr: 2, border: isOnline ? "2px solid green" : "none" }}
        />
        <Typography variant="body1" color="textPrimary">
          {user?.role == "admin" || user?.role == "instructor"
            ? user.role
            : user?.admNumber}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default SingleUsers;
