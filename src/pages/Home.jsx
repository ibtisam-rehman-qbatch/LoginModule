import React, { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  console.log("user: ", user);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {user ? (
        <div>
          <p>Current User: {user.name}</p>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      ) : (
        <div>No User logged-in</div>
      )}
    </>
  );
};

export default Home;
