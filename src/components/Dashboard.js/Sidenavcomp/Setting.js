import React, { useState } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";
import Topnav from "../Topnav";
import "./Setting.css";

const Setting = () => {
  var companyName = sessionStorage.getItem("companyName");
  const [compname, setcompname] = useState(companyName);
  const [compemail, setcompemail] = useState("");
  const [form, setform] = useState(false);
  const [Imageselected, setImageselected] = useState("");
  const editdata = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("file", Imageselected);
    console.log(formData.get("file"));
    setImageselected(formData.get("file"));
    axios
      .post(
        "https://kriya-backendapi-dev.redblacktree.net/api/v1/tenants/addLogo",
        formData
      )
      .then((resp) => {
        console.log(resp);
        console.log("sent sucess");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function triggerClick(e) {
    document.querySelector("#profileImage").click();
  }
  function displayImage(e) {
    setImageselected(e.target.files[0]);
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document
          .querySelector("#profileDisplay")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  return (
    <>
      <Sidenav />
      <div className="settingpage">
        <Topnav />
        <br></br>
        <div className="userheading">
          <h5>Company Details</h5>
        </div>
        <br></br>
        <div className="settingblock ml-3">
          {form ? (
            <form onSubmit={editdata}>
            <div
              className="form-group text-center"
              style={{ position: "relative" }}
            >
              <span className="img-div">
                <div
                  className="text-center img-placeholder"
                  onClick={triggerClick}
                ></div>
                <img
                  src="https://kriya-bucket.s3.amazonaws.com/tenant/logo/tenant_1604237071_coffee.jpeg"
                  onClick={triggerClick}
                  id="profileDisplay"
                />
              </span>
              <input
                type="file"
                name="profileImage"
                onChange={(e) => displayImage(e)}
                id="profileImage"
                className="form-control"
                style={{ display: "none" }}
              />
            </div>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Company Name
            </label>
            <input
              type="text"
              id="defaultFormLoginEmailEx"
              className="form-control"
              value={compname}
              onChange={(e) => setcompname(e.target.value)}
            />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
              Contact E-mail
            </label>
            <input
              type="text"
              id="defaultFormLoginPasswordEx"
              className="form-control"
              onChange={(e) => setcompemail(e.target.value)}
            />
            <div className="cancelsave">
              <button className="btn btn-secondary" type="button" onClick={() => setform(false)}>
                Cancel
              </button>
              <button className="btn btn-secondary" type="submit">
                Save
              </button>
            </div>
          </form>
          ) : (
            <div>
              <div
                className="form-group text-center"
                style={{ position: "relative" }}
              >
                <span className="img-div">
                  <div className="text-center img-placeholder">
                
                  </div>
                  <img
                    src="https://kriya-bucket.s3.amazonaws.com/tenant/logo/tenant_1604237071_coffee.jpeg"
                    id="profileDisplay"
                  />
                 
                </span>
                <input
                  type="file"
                  name="profileImage"
                  onChange={(e) => displayImage(e)}
                  id="profileImage"
                  className="form-control"
                  style={{ display: "none" }}
                />
              </div>
              <div className="editblock ">
                <p>{compname}</p>
                <a style={{ color: "#4285F4" }} onClick={() => setform(true)}>
                  Change Company Name
                </a>
                <br></br>
                <p>{compname}</p>
                <a style={{ color: "#4285F4" }} onClick={() => setform(true)}>
                  Change Company Email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Setting;
