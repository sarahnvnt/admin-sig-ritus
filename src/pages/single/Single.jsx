import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { pathName, setDataPage } from "../../utils/naming";
import EditRitus from "../editritus/EditRitus";
import EditProvince from "../editProvince/EditProvince";
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
          {setDataPage(<EditRitus />, <EditProvince />, <EditRitus />)}
        </div>
      </div>
    </div>
  );
};

export default Single;
