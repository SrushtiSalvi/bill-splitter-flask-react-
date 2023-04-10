import React, { useState } from "react";
import { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { get_user_details } from "../../api";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState({});

  const currentUser = async () => {
    const res = await get_user_details();
    if (res.data.success) {
      setUser(res.data.user);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-600">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center justify-between" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <span className="text-white">Bill Splitter</span>
            <div>
              <button className=" flex">
                <BsFillPersonFill className="text-2xl border rounded-full text-white" />
                <span className="text-white px-2">{user.firstName}</span>
                <RiArrowDropDownLine className="text-2xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
