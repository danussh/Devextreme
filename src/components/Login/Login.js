import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../Helpers/Context";
import "./Login.css";
import { LoginId } from "../../ServiceApi";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = () => {
  const history = useHistory();
  window.addEventListener("popstate", () => {
    history.push("/");
    window.location.replace("/");
  });
  // Use ContextAPI
  const value = useContext(LoginContext);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errmessage, seterrmessage] = useState("");
  const UserLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(LoginId, {
        email: Email,
        password: Password,
      })
      .then((resp) => {
       // console.log(resp);
        var token = resp.data.token.replace("Bearer", "");
        var decoded = jwt_decode(token);
        if (decoded.isAdmin) {
          if(decoded.status===2){
            sessionStorage.setItem("token", resp.data.token);
            sessionStorage.setItem("companyName", decoded.companyName);
            sessionStorage.setItem("fullName", decoded.firstName);
            sessionStorage.setItem("lfullName",  decoded.lastName);
            sessionStorage.setItem("emailid",decoded.email)
            value.setLoggedin(resp.data.token);
            history.push({
              pathname: '/dashboard',
            })
           
          }else{
            seterrmessage("Verify email address by clicking the link sent to your email");
          }
        } else {
          // console.log("Login Failed");
          seterrmessage("Invalid Credentials");
        }
      })
      .catch((error) => {
        //console.log(error);
        if (error.message === "Request failed with status code 400") {
          seterrmessage("Wrong Username or Password Combination.");
          // console.log('invalid Credentials');
        } else {
          seterrmessage("Wrong Username or Password Combination.");
        }
      });
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row ">
          <div className=" login-box  mt-5">
            <div className="logo-container p-0">
              <img src="logo.png" alt="logo" />
            </div>
            <form className="container col-10" onSubmit={UserLogin}>
              <label className="heading">Log In</label>
              <br></br>
              <br></br>
              <div className="email">
                <label
                  htmlFor="validationDefault01"
                  className="form-label "
                  aria-describedby="emailHelp"
                >
                  Email Address<span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="validationDefault01"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="password">
                <label htmlFor="validationDefault03" className="form-label">
                  Password <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="validationDefault03"
                  required
                />
                <div className="mt-4">
                  {<h6>{errmessage}</h6>}
                  <button className="btn btn-block" type="submit">
                    <div className="text">Log In</div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
