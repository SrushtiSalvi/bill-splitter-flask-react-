import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
      toast("You are already logged in");
      return navigate("/home");
    }
  }, []);

  return (
    <div className="flex justify-center space-x-2">
      <button onClick={() => navigate("/login")} className="px-4 py-2 border">
        Login
      </button>
      <button onClick={() => navigate("/signup")} className="px-4 py-2 border">
        Signup
      </button>
    </div>
  );
};

export default Home;
