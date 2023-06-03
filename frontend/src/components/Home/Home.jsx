import React, { useState } from "react";
import VendorLogin from "../vender/venderLogin";
import UserLogin from "../user/userLogin";
import VendorSignup from "../vender/venderSign";
import UserSignup from "../user/userSignUp";
import { AiFillApple } from "react-icons/ai";
import "./Home.css";

const Home = () => {
  const [showVendorLogin, setShowVendorLogin] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showVendorSignup, setShowVendorSignup] = useState(false);
  const [showUserSignup, setShowUserSignup] = useState(false);

  const handleVendorClick = () => {
    setShowVendorLogin(true);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(false);
  };

  const handleUserClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(true);
    setShowVendorSignup(false);
    setShowUserSignup(false);
  };

  const handleVendorSignupClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(true);
    setShowUserSignup(false);
  };

  const handleUserSignupClick = () => {
    setShowVendorLogin(false);
    setShowUserLogin(false);
    setShowVendorSignup(false);
    setShowUserSignup(true);
  };

  return (
    <div className="home_container">
      <div className="logo_box">
        <AiFillApple size="50%" color="white" />
      </div>
      <h1 className="heading_home_box">MY EVENT PROPOSALS WEBSITE</h1>

      <div className="home_login_signup_container">
        <div className="home_btn_container">
          <button
            onClick={handleVendorClick}
            className={showVendorLogin ? "active" : ""}
          >
            Vendor
          </button>
          <button
            onClick={handleUserClick}
            className={showUserLogin ? "active" : ""}
          >
            User
          </button>
        </div>

        {showVendorLogin && (
          <>
            <VendorLogin />
            {!showVendorSignup && (
              <div
                className="createAccount"
                onClick={handleVendorSignupClick}
              >
                Create Account
              </div>
            )}
          </>
        )}

        {showUserLogin && (
          <>
            <UserLogin />
            {!showUserSignup && (
              <div className="createAccount" onClick={handleUserSignupClick}>
                Create Account
              </div>
            )}
          </>
        )}

        {showVendorSignup && (
          <>
            <VendorSignup />
            <div className="createAccount" onClick={handleVendorClick}>
              SignIn
            </div>
          </>
        )}

        {showUserSignup && (
          <>
            <UserSignup />
            <div className="createAccount" onClick={handleUserClick}>
              SignIn
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
