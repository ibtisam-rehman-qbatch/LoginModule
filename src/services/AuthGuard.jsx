import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./AuthService";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
  const [isLoggedin, setLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = getCurrentUser();
    console.log("userLoof: ", userLoggedIn);
    if (userLoggedIn) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
      navigate("/");
    }
  }, [navigate]);

  return <>{isLoggedin && children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.any,
};

export default AuthGuard;
