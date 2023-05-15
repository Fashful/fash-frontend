import React, { useContext } from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHeart,
  faPlusCircle,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link className="redirect" to="/">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
          <Link className="redirect" to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link className="redirect" to="/createPost">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Link>
          <Link className="redirect" to="/followingpost">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link className="redirect" to={"/"}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
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
