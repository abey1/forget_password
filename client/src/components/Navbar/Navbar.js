import "./Navbar.scss";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="logo">MLE</div>
      <div className="loggedInUser">
        <div className="navlink">
          <Link className="login" to="/login">
            login
          </Link>
        </div>
        <div className="navlink">
          <Link className="signup" to="signup">
            signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
