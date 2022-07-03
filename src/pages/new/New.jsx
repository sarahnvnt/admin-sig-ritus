import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
//import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./new.scss";
import AddCulture from "../addCulture/AddCulture";
import AddProvince from "../addProvince/AddProvince";
import AddUser from "../addUser/AddUser";
import { pathName, setDataPage } from "../../utils/naming";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Tambah {pathName()}</h1>
        </div>
        {/* <div className="back">
          <a href="/cultures">
            <button>Back</button>
          </a>
        </div> */}
        <div className="mid">
          {setDataPage(<AddCulture />, <AddProvince />, <AddUser />)}
        </div>
      </div>
    </div>
  );
};

export default New;
