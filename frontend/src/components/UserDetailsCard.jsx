import React from "react";

const UserDetailsCard = ({ user }) => {
  return (
    <div className="p-4">
      <h1 className="">
        {user.firstName} {user.lastName}
      </h1>
      <span>{user.email}</span>
    </div>
  );
};

export default UserDetailsCard;
