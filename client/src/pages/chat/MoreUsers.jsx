import React from "react";
import SingleUsers from "./SingleUsers";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const MoreUsers = () => {
  // custom hooks:--
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return; // react easy return

  return (
    <div style={{ color: "honeydew" }} className="overflow-auto flex-1">
      {otherUsers?.map((user) => {
        return <SingleUsers key={user._id} user={user} />;
      })}
    </div>
  );
};

export default MoreUsers;
