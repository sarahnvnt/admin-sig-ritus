import React from "react";
import "./widget.scss";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";

const Widget = ({ type, value }) => {
  let data;

  // temp
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "BUDAYA",
        isMoney: false,
        link: "Lihat Semua Ritus",
        icon: <PersonOutlineOutlinedIcon className="icon" />,
      };
      break;
    case "order":
      data = {
        title: "PROVINSI",
        isMoney: true,
        link: "Lihat Semua Provinsi",
        icon: <Inventory2OutlinedIcon className="icon" />,
      };
      break;
    case "products":
      data = {
        title: "ADMIN",
        isMoney: false,
        link: "lihat semua admin",
        icon: <LocalFloristOutlinedIcon className="icon" />,
      };
      break;
    case "delivery":
      data = {
        title: "DELIVERIES",
        isMoney: true,
        link: "see all deliveries",
        icon: <LocalShippingOutlinedIcon className="icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{value}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ArrowUpwardOutlinedIcon /> {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
