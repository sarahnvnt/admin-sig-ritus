import React from "react";
import "./widget.scss";
import MosqueRoundedIcon from "@mui/icons-material/MosqueRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";

const Widget = ({ type, value }) => {
  let data;

  switch (type) {
    case "ritus":
      data = {
        title: "BUDAYA RITUS",
        link: "Lihat Semua Ritus",
        icon: <MosqueRoundedIcon className="icon" />,
        path: "/cultures",
      };
      break;
    case "provinces":
      data = {
        title: "PROVINSI",
        link: "Lihat Semua Provinsi",
        icon: <MapRoundedIcon className="icon" />,
        path: "/provinces",
      };
      break;
    // case "products":
    //   data = {
    //     title: "ADMIN",
    //     isMoney: false,
    //     link: "lihat semua admin",
    //     icon: <LocalFloristOutlinedIcon className="icon" />,
    //   };
    //   break;
    // case "delivery":
    //   data = {
    //     title: "DELIVERIES",
    //     isMoney: true,
    //     link: "see all deliveries",
    //     icon: <LocalShippingOutlinedIcon className="icon" />,
    //   };
    //   break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{value}</span>
        <span className="link">
          <a href={data.path}>{data.link}</a>
        </span>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <ArrowUpwardOutlinedIcon />
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
