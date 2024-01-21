import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../views/user/Homepage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Category from "../views/user/Category";
import Blogs from "../views/user/Blogs";
import Vendor from "../views/user/Vendor";
import Cart from "../views/user/Cart";
import Contact from "../views/user/Contact";
import ProductDetails from "../views/user/ProductDetails";
import Checkout from "../views/user/Checkout";
import UserAccountRoutes from "./UserAccountRoutes";

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store/:vendorId" element={<Vendor />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/account/*" element={<UserAccountRoutes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
