import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_user_details } from "../api";
import Expenses from "../components/Expenses";
import UserDetailsCard from "../components/UserDetailsCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const currentUser = async () => {
    const res = await get_user_details();
    console.log(res);
    if (res.data.success) {
      setUser(res.data.user);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("access_token");

    navigate("/login");
  };
  return (
    <div className="w-4/5  grid grid-cols-5">
      <div className="col-span-1 shadow">
        <UserDetailsCard user={user} />
      </div>
      <div className="col-span-3 ">
        <Expenses user={user} />
      </div>
      <div className="col-span-1 shadow">dfsdfd</div>
    </div>
  );
};

export default Dashboard;
