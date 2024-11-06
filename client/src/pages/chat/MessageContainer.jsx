import React, { useContext, useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";
import { Box, Typography, Avatar } from "@mui/material";
import { ElearningContext } from "../../context/ElearningContext";

const MessageContainer = () => {
  const { username } = useContext(ElearningContext);
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col">
          <div className="flex gap-2 items-center bg-zinc-800 text-white rounded px-4 py-2 mb-2">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="profile-pic" />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex jusify-between gap-2">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <Box
          className="md:min-w-[550px] flex flex-col justify-center items-center"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            bgcolor: "background.default",
            color: "text.primary",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Avatar
            src={authUser?.profilePhoto}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Hi, {authUser?.fullName}
          </Typography>
          <Typography variant="h6">Let's Start a Conversation</Typography>
        </Box>
      )}
    </>
  );
};

export default MessageContainer;

// import React, { useContext, useEffect } from "react";
// import SendInput from "./SendInput";
// import Messages from "./Messages";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUser } from "../../redux/userSlice";
// import mp4 from "../../assets/mp4.png";
// import { ElearningContext } from "../../context/ElearningContext";

// const MessageContainer = () => {
//   const { username } = useContext(ElearningContext);
//   const { selectedUser, authUser } = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     return () => dispatch(setSelectedUser(null));
//   }, []);

//   return (
//     <>
//       {selectedUser !== null ? (
//         <div className="md:min-w-[550px] flex flex-col">
//           <div className="flex gap-2 items-center bg-zinc-800 text-white rounded px-4 py-2 mb-2">
//             <div className="avatar online">
//               <div className="w-12 rounded-full">
//                 <img src={selectedUser?.profilePhoto} alt="profile-pic" />
//               </div>
//             </div>
//             <div className="flex flex-1 flex-col">
//               <div className="flex jusify-between gap-2">
//                 <p>{selectedUser?.fullName}</p>
//               </div>
//             </div>
//           </div>
//           <Messages />
//           <SendInput />
//         </div>
//       ) : (
//         <>hello amigo</>
//         // <div className="md:min-w-[550px] flex flex-col justify-center items-center ">
//         //   <h1 className="text-4xl text-white font-bold">
//         //     Hi, {authUser?.fullName}
//         //   </h1>
//         //   <h1 className="text-2xl text-white">Let's Start Conversation</h1>
//         // </div>
//       )}
//     </>
//   );
// };

// export default MessageContainer;
