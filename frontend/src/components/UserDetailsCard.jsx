import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const UserDetailsCard = () => {
  const user = useSelector(selectUser);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        Hello, {user.firstName} {user.lastName}
      </h1>
      <span className="text-base">{user.email}</span>
    </div>
  );
};

export default UserDetailsCard;
