import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../views/user/Homepage";
import Header from "../layout/Header";
import Register from "../views/user/Register";
import Footer from "../layout/Footer";

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
