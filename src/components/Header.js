import React from "react";
import logo from "../img/leboncoin.svg.png";

import { Link, useHistory } from "react-router-dom";

import Cookies from "js-cookie";

const Header = (props) => {
  let history = useHistory();

  return (
    <div className="header">
      <div className="headerOne">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo le bon coin" />
          </Link>
        </div>
        <div className="depot">
          <Link to="/publish">
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
            Deposer une annonce
          </Link>
        </div>
        <div className="recherche">
          <Link to="/">
            <i class="fa fa-search" aria-hidden="true"></i> Rechercher
          </Link>
        </div>
      </div>
      {props.loggedIn ? (
        <div
          className="connect"
          onClick={() => {
            Cookies.remove("token");
            history.push("/");
            props.onLogOut();
          }}
        >
          <i class="fa fa-user" aria-hidden="true"></i>
          <div>Se deconnecter</div>
        </div>
      ) : (
        <Link to="/login">
          <div className="connect">
            <i class="fa fa-user" aria-hidden="true"></i>
            <div>Se connecter</div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
