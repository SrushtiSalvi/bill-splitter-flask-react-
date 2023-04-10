import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("access_token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      toast("You are not logged in");
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return <>{isLoggedIn ? props.children : null}</>;
};
export default ProtectedRoute;
