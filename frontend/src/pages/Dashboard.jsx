import React, { useState } from "react";
import { useEffect } from "react";
import { get_user_details } from "../api";
import Budget from "../components/Budget";
import Expenses from "../components/Expenses";
import SideOptions from "../components/SideOptions";
import UserDetailsCard from "../components/UserDetailsCard";

const Dashboard = () => {
  const [user, setUser] = useState({});

  const currentUser = async () => {
    await get_user_details()
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <div className="w-4/5 grid grid-cols-5 ">
      <div className="col-span-1 shadow">
        <div>
          <UserDetailsCard />
          <SideOptions />
        </div>
      </div>
      <div className="col-span-3 ">
        <Expenses />
      </div>
      <div className="col-span-1 shadow">
        <Budget />
      </div>
    </div>
  );
};

export default Dashboard;
