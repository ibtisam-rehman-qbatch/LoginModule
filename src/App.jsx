import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthGuard from "./services/AuthGuard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="home"
            element={
              <AuthGuard>
                {" "}
                <Home />{" "}
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
