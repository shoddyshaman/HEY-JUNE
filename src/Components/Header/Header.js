import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUser, clearUser } from "../../Redux/userReducer";
import { connect } from "react-redux";
import { useEffect } from "react";
import "./Header.css";

const Header = (props) => {
  // console.log(props)
  const { user, setUser } = props;

  useEffect(() => {
    axios
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, [setUser]);

  const handleLogout = () => {
    axios
      .get("/auth/logout")
      .then(() => {
        props.clearUser();
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    
    <div>
      {user.hasOwnProperty("user_id") ? (
        <header className="header-container">
        <h1>
          <Link to="/home">Hey June!</Link>
        </h1>
        <nav className="navbar-container">
          <Link to="/home">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/bag">Bag</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </nav>
        </header>
      ) : (
        <header className="header-container-login">
        <h1>
          <Link to="/">Hey June!</Link>
        </h1>
        </header>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.userReducer.user,
  };
};

export default connect(mapStateToProps, { setUser, clearUser })(Header);
