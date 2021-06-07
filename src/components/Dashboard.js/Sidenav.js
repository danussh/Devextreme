import React from "react";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import "./Sidenav.css";

const Sidenav = () => {
  const history = useHistory();
  const Logout = () => {
    sessionStorage.clear();
    history.push("/");
  };
  return (
    <div className="sidenavbar">
      <div className="logo-containers">
        <img id="logo" src="logo beta@2x.png" alt="Logo" />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="Navmenu">
        <div className="users" onClick={() => history.push("/dashboard")}>
          <i className="fa fa-users"></i>
          <li className="rows" id="active">
            Users
          </li>
        </div>
        <div className="settings" onClick={() => history.push("/Setting")}>
          <i className="fa fa-cog"></i>
          <li className="rows" id="active">
            Settings
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
