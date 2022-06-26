import React, { useContext } from "react";
import "./sidebar.scss";
import { useDispatch } from "react-redux";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import MosqueRoundedIcon from "@mui/icons-material/MosqueRounded";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userRedux";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const SidebarData = [
    {
      id: 1,
      title: "Dashboard",
      icon: <DashboardRoundedIcon className="icon" />,
      path: "/",
    },
    {
      id: 2,
      title: "Ritus",
      icon: <MosqueRoundedIcon className="icon" />,
      path: "/cultures",
    },
    {
      id: 3,
      title: "Provinsi",
      icon: <AddLocationAltRoundedIcon className="icon" />,
      path: "/provinces",
    },
    {
      id: 4,
      title: "Pengguna",
      icon: <GroupAddRoundedIcon className="icon" />,
      path: "/users",
    },
    {
      id: 5,
      title: "Keluar",
      path: "/login",
      icon: <ExitToAppRoundedIcon className="icon" />,
    },
  ];

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Ritus</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {SidebarData.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <li
                id={
                  window.location.pathname.split("/")[1] ===
                  item.path.split("/")[1]
                    ? "active"
                    : ""
                }
                onClick={item.title === "Keluar" ? handleLogout : ""}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
