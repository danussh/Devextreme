import React, { useEffect, useState } from "react";
import "@szhsin/react-menu/dist/index.css";
import Topnav from "./Topnav";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Selection,
  Lookup,
  FilterRow,
  RequiredRule,
  EmailRule,
  Texts,
} from "devextreme-react/data-grid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { GetId, PostId, PutID, Socket } from "../../ServiceApi/index";
import "./Dashboard.css";
import Sidenav from "./Sidenav";
import axios from "axios";
import io from "socket.io-client";

const Dashboard = (props) => {
  const [Status, setStatus] = useState("New");
  const emailid = sessionStorage.getItem("emailid");
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    handleSocket();
  }, []);
  const handleSocket = () => {
    const lobby = io(Socket);
    lobby.on("connect", function (socket) {
      // console.log('connected to Socket');
    });
    lobby.on("getNotifications", (data) => {
      if (data === "message") {
        // console.log(data)
      } else {
        if (data.status === 2) {
          data.status = "Active";
          setStatus("Äctive");
          setcount(count + 10);
        }
      }
    });
  };

  const [repoarray, setrepoarray] = useState([]);
  const [count, setcount] = useState(0);
  const history = useHistory();
  window.addEventListener("popstate", (eve) => {
    history.push("/dashboard");
    window.location.replace("/dashboard");
  });
  useEffect(() => {
    axios
      .get(GetId, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        res.data.rows.filter((data, index) => {
          return data.status === 2;
        });
        res.data.rows.push({
          employeeId: "",
          firstName: "",
          lastName: "",
          email: "",
          department: "",
          reportingTo: "",
          status: "",
          sno: "",
          fullName: "",
          isDeleted: 0,
        });
        // console.log(res.data.rows)
        setrepoarray(
          res.data.rows.filter((data, index) => {
            if (data.fullName === "") {
              return data;
            }
            return data.status === 2 && data.isDeleted === 0;
          })
        );
        setuserData(
          res.data.rows.filter((val, index) => {
            if (val.status === 2) {
              val.status = "Active";
            } else if (val.status === 1) {
              val.status = "Invited";
            } else {
              val.status = "New";
            }
            return val.isDeleted === 0;
          })
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [count]);
  const calculateDisplayValue = (params) => {
    //console.log(params);
  };
  repoarray.find((val)=>{
   // console.log(val)
    if(val.email===emailid){
      sessionStorage.setItem("imageUrl",val.imageUrl)
    }
  })

  function onRowUpdating(params) {
    const arr = Object.entries(params.oldData);
    if (arr.length >= 19) {
      var val = true;
      const employeeId = arr[1][0];
      const id = arr[1][1];

      const firstName = arr[2][0];
      const fname = arr[2][1];

      const lastName = arr[3][0];
      const lname = arr[3][1];

      const department = arr[14][0];
      const dept = arr[14][1];

      const reportingTo = arr[11][1];
      const rep = arr[11][1];
      if (val) {
        axios
          .put(PutID + `${params.key.id}`, params.newData, {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log("Update Sucess");
            //setcount(count+1)
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //console.log('Not in db Update');
      }
    }
  }
  const onCellClick = (ev) => {};
  const onContentReady = (params) => {
    //  console.log(params)
  };
  const onEditorPreparing = (ev) => {
    // console.log(ev)
  };
  const onCellPrepared = (e) => {
    if (e.columnIndex === 8) {
      e.column.width = "60px";
    }
    if (e.rowType === "data" && e.columnIndex === 6) {
      e.cellElement.classList.add("dx-col-alt");
    }
    if (e.rowType === "header" && e.columnIndex === 8) {
      e.cellElement.classList.add("dx-col-icon");
    }
    if (e.rowType === "header" && e.columnIndex === 8) {
    }
    if (e.rowType === "data" && e.columnIndex === 0) {
    }

    if (
      e.columnIndex === 8 &&
      e.rowType === "data" &&
      e.data.status === "New"
    ) {
      e.cellElement.style.pointerEvents = "none";
      e.cellElement.style.display = "none";
    }
    if (e.columnIndex === 0 && e.rowType === "header") {
      e.column.alignment = "left";
    }
    if (e.rowType === "data") {
      if (e.columnIndex === 1) {
      }
      if (e.columnIndex === 2 || e.columnIndex === 3 || e.columnIndex === 4) {
        if (
          (e.columnIndex === 2 && e.key.status === "New") ||
          (e.columnIndex === 3 && e.key.status === "New") ||
          (e.columnIndex === 4 && e.key.status === "New")
        ) {
          if (
            e.key.firstName === "" &&
            e.key.lastName === "" &&
            e.key.email === ""
          ) {
            // console.log(e)
            // e.cellElement.style.border='2px solid red';
          }
        } else {
          //e.cellElement.style.color='red'
          e.cellElement.style.pointerEvents = "none";
        }
      } else {
        // e.cellElement.style.color='green'
      }
    }
  };
  const setCellValue = (newData, value, currentRowData) => {};
  const onRowUpdated = (params) => {
    if (params.data.status === "New") {
      if (params.data.firstName && params.data.lastName && params.data.email) {
        const post = {
          employeeId: params.data.employeeId,
          firstName: params.data.firstName,
          lastName: params.data.lastName,
          email: params.data.email,
          department: params.data.department,
          reportingTo: params.data.reportingTo,
        };
        axios
          .post(PostId, post, {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          })
          .then((res) => {
            //console.log(res);
            //console.log('Adding sucess in DB');
            setcount(count + 1);
          })
          .catch((err) => {
            if (err.message === "Request failed with status code 400") {
              toast.error("Email ID already exists", {
                position: "top-right",
                autoClose: 2000,
              });
              params.component.cellValue(
                params.component.totalCount() - 1,
                "email",
                ""
              );
              params.component.saveEditData();
            } else {
              toast.error("Invalid Email ID", {
                position: "top-right",
                autoClose: 2000,
              });
              params.component.cellValue(
                params.component.totalCount() - 1,
                "email",
                ""
              );
              params.component.saveEditData();
            }
          });
      }
    }
  };
  const onRowPrepared = (params) => {
    // console.log(params)
  };
  const onRowRemoved = (params) => {
    userData.map((data, val) => {
      if (data.reportingTo === params.data.fullName) {
        if (data.sno <= params.data.sno) {
          params.component.cellValue(data.sno - 1, "reportingTo", "");
          params.component.saveEditData();
          console.log(params);
        } else {
          params.component.cellValue(data.sno - 1, "reportingTo", "");
          params.component.saveEditData();
        }
      }
    });
    setrepoarray(
      repoarray.filter((val, index) => {
        return val.fullName != params.data.fullName;
      })
    );
    axios
      .put(
        PutID + `${params.key.id}`,
        {
          isDeleted: 1,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        // console.log('Deleted Sucessfully');
        //setcount(count+1)
      })
      .catch((err) => {});
  };
  const cellRender = (params) => {
    userData.map((data, index) => {
      if (data.isDeleted === 0) {
        data.sno = index + 1;
      }
    });
    return params.rowIndex + 1;
  };
  const onKeyDown = (e) => {
    if (e.event.key === "Tab") {
      e.handled = true;
    }
  };
  const onCellHoverChanged = (e) => {
    if (e.rowType === "data" && e.columnIndex === 8) {
      // console.log(e.cellElement)
      // var x = document.getElementsByTagName("A")
      // console.log(x)
      e.cellElement.setAttribute("data-toggle", "tooltip");
      e.cellElement.setAttribute("data-placement", "top");
      e.cellElement.setAttribute("title", "Delete");
      e.cellElement.setAttribute("title", "Delete");
      e.cellElement.classList.add("red-tooltip");
    }
  };
  const onRowRemoving = (e) => {
    // console.log(e)
  };
  const cellRenderstatus = (e) => {
    if (e.value === "Active") {
      return (
        <>
          <span className="dotactive"></span>
          <span className="status"> {e.value}</span>
        </>
      );
    } else if (e.value === "Invited") {
      return (
        <>
          <span className="dotinvited"></span>
          <span className="status"> {e.value}</span>
        </>
      );
    }
    return (
      <>
        <span className="dotnew"></span>
        <span className="status"> {e.value}</span>
      </>
    );
  };

  return (
    <>
      <Sidenav />
      <div className="userManagement">
        <Topnav />
        <br></br>
        <div className="userheading">
          <h5>Users</h5>
        </div>
        {/* Excell Sheet  DEVEXTREME*/}
        <div id="data-grid-demo ">
          <DataGrid
            id="gridContainer"
            repaintChangesOnly={true}
            allowColumnResizing={true}
            dataSource={userData}
            showBorders={true}
            showRowLines={true}
            onContentReady={onContentReady}
            onRowRemoved={onRowRemoved}
            onEditorPreparing={onEditorPreparing}
            columnAutoWidth={true}
            onKeyDown={onKeyDown}
            onCellHoverChanged={onCellHoverChanged}
            //calculateCellValue={calculateCellValue}
            onRowUpdating={onRowUpdating}
            onRowUpdated={onRowUpdated}
            onRowPrepared={onRowPrepared}
            onCellClick={onCellClick}
            onContentReady={onContentReady}
            onCellPrepared={onCellPrepared}
            columnAutoWidth={true}
            onRowRemoving={onRowRemoving}
          >
            <FilterRow visible={true} />
            <Paging enabled={false} />
            <Selection mode="single" />
            <Editing mode="cell" allowUpdating={true} allowDeleting={true}>
              <Texts confirmDeleteMessage="Are you sure you want to delete this user ?" />
            </Editing>
            <Column
              // calculateCellValue={calculateCellValue}
              // setCellValue={setCellValue}
              cellRender={cellRender}
              caption="#"
              allowEditing={false}
            />
            <Column dataField="employeeId" />
            <Column dataField="firstName" caption="First Name *">
              <RequiredRule message="First Name cannot be Empty" />
            </Column>
            <Column dataField="lastName" caption="Last Name *">
              <RequiredRule message="Last Name cannot be Empty" />
            </Column>
            <Column dataField="email" caption="Email *">
              <EmailRule message="Email ID is Invalid" />
              <RequiredRule message="Email cannot be Empty" />
            </Column>
            <Column
              dataField="department"
              //width={100}
            />
            <Column
              dataField="reportingTo"
              caption="Reporting To"
              //  width={170}
              cssClass="cell-highlighted"
            >
              <Lookup
                dataSource={repoarray}
                valueExpr="fullName"
                displayExpr="fullName"
              />
            </Column>
            <Column
              dataField="status"
              allowEditing={false}
              cellRender={cellRenderstatus}
            />
          </DataGrid>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
