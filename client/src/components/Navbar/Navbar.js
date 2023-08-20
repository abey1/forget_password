import "./Navbar.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LOGOUT } from "../../utilities/constants";
const Navbar = () => {
  const { email, userDispatch } = useUserContext();
  const handleLogout = () => {
    userDispatch({ type: LOGOUT });
  };
  return (
    <div className="nav">
      <div className="logo">MLE</div>
      <div className="nav_right">
        {email === "" ? (
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
        ) : (
          <div className="nav_email_holder">
            <div className="email">{email}</div>
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
