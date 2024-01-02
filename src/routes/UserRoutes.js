import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../views/user/Homepage";
import Header from "../layout/Header";

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
