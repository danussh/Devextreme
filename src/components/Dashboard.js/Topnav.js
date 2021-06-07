import React from "react";
import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import "./Topnav.css";
const Topnav = () => {
  const company = sessionStorage.getItem("companyName");
  const fullName = sessionStorage.getItem("fullName");
  const lName = sessionStorage.getItem("lfullName");
  const image = sessionStorage.getItem("imageUrl");
  const history = useHistory();
  const Logout = () => {
    sessionStorage.clear();
    history.push("/");
  };
  return (
    <div className="headingkriya ">
      <h4>Kriya Admin Portal</h4>
      <div className="avatar">
        <Menu
          menuButton={
            <MenuButton>
              {image ? (
                <Tooltip title={fullName+" "+lName} placement="top-start">
                 <Avatar className="mt-1" id="pic" src={image} />
              </Tooltip> 
              ) : (
                <Avatar>Av</Avatar>
              )}
            </MenuButton>
          }
        >
          <MenuItem className="account">
            <h5> Account</h5>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <div className="userblock">
              <Avatar className="mr-2 mt-1 avtimage" id="pic" src={image} />
              <div className="d-f ">
              <p style={{"margin-bottom":"0px"}}>
                {fullName} {lName}
              </p>
              <p className="compash"> {company}</p>
              </div>
            </div>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <div onClick={Logout}>
              <i className="fa fa-sign-out"></i> Logout
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Topnav;
