import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../views/user/Homepage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Category from "../views/user/Category";

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Category />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
