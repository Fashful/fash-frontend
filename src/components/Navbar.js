import React, { useContext } from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import SearchBar from "./SearchBar";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">Create Post</Link>
          <Link style={{ marginLeft: "20px" }} to="/followingpost">
            My Following
          </Link>
          <Link to={"/"}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };
  const searchBar = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [<SearchBar className="searchbar" />];
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="FashFul Logo" style={{ width: "50%" }} />
      </Link>
      <ul className="searchbar"> {searchBar()}</ul>
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}
