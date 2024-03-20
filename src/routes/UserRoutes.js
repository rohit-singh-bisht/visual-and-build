import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Homepage from "../views/user/Homepage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Search from "../views/user/Search";
import Blogs from "../views/user/Blogs";
import Vendor from "../views/user/Vendor";
import Cart from "../views/user/Cart";
import Contact from "../views/user/Contact";
import ProductDetails from "../views/user/ProductDetails";
import Checkout from "../views/user/Checkout";
import UserAccountRoutes from "./UserAccountRoutes";
import AuthenticationForm from "../components/forms/authentication/AuthenticationForm";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useAppContext } from "../context/useAppContext";
import PrivateRoute from "./PrivateRoute";
import Thankyou from "../views/user/Thankyou";
import { useEffect } from "react";
import BlogDetails from "../views/user/BlogDetails";
import GroupBuy from "../views/user/GroupBuy";

const AuthPopupStyle = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserRoutes = () => {
  const { isAuthForm, setIsAuthForm } = useAppContext();
  const isLoggedIn = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {isAuthForm && !isLoggedIn && (
        <AuthPopupStyle>
          <AuthenticationForm setIsAuthForm={setIsAuthForm} />
        </AuthPopupStyle>
      )}
      <Header setIsAuthForm={setIsAuthForm} />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/categories"
          element={
            <Search
              showCategory={true}
              showProducts={false}
              showRelated={false}
            />
          }
        />
        <Route path="/group-buy" element={<GroupBuy />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/seller/:sellerId" element={<Vendor />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/account/*" element={<UserAccountRoutes />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
