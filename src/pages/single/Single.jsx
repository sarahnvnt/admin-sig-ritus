import React from "react";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import { pathName, setDataPage } from "../../utils/naming";
import EditRitus from "../editritus/EditRitus";
import EditProvince from "../editProvince/EditProvince";
import EditUser from "../editUser/EditUser";
import "./single.scss";

const Single = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Edit {pathName()}</h1>
        </div>
        <div className="mid">
          {setDataPage(<EditRitus />, <EditProvince />, <EditUser />)}
        </div>
      </div>
    </div>
  );
};

export default Single;
