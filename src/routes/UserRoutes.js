import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../views/user/Homepage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Category from "../views/user/Category";
import Blogs from "../views/user/Blogs";
import Vendor from "../views/user/Vendor";
import Cart from "../views/user/Cart";
import Account from "../views/user/Account";
import ProfileInformation from "../views/user/ProfileInformation";
import Contact from "../views/user/Contact";

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store/:vendorId" element={<Vendor />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile-information" element={<ProfileInformation />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
