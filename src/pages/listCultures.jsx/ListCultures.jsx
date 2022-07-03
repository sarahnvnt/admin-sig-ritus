import React, { useEffect } from "react";
import Datatable from "../../components/datatable/Datatable";
import { deleteCulture, getCultures } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./listcultures.scss";

const ListCultures = () => {
  const dispatch = useDispatch();
  const { cultures } = useSelector((state) => state.cultures);
  console.log(cultures);

  useEffect(() => {
    getCultures(dispatch);
  }, []);

  const handleDelete = (id) => {
    deleteCulture(id, dispatch, toast);
  };

  const provinceColumns = [
    { field: "_id", headerName: "ID", minWidth: 100, flex: 1 },
    {
      field: "reg_num",
      headerName: "No. Regist",
      minWidth: 100,
      flex: 1,

      renderCell: (params) => {
        return params.row.reg_num || "-";
      },
    },
    {
      field: "type",
      headerName: "type",
      minWidth: 80,
      flex: 1,

      renderCell: (params) => {
        return params.row.type || "-";
      },
    },
    {
      field: "year",
      headerName: "Tahun",
      minWidth: 80,
      flex: 1,
      renderCell: (params) => {
        return params.row.year || "-";
      },
    },

    {
      field: "name",
      headerName: "Nama Ritus",
      minWidth: 150,
      flex: 1,

      renderCell: (params) => {
        return params.row.name;
      },
    },
    {
      field: "province",
      headerName: "Provinsi",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return params.row?.province?.name;
      },
    },

    {
      field: "desc",
      headerName: "Deskripsi",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return params.row.desc || "-";
      },
    },

    // {
    //   field: "img",
    //   headerName: "Foto",
    //   minWidth: 50,
    //   flex: 1,

    //   renderCell: (params) => {
    //     return params.row.img.length > 0 ? params.row.img.length : "-";
    //   },
    // },
    // {
    //   field: "video",
    //   headerName: "Video",
    //   minWidth: 50,
    //   flex: 1,

    //   renderCell: (params) => {
    //     return params.row.video.length > 0 ? params.row.video.length : "-";
    //   },
    // },
  ];

  return (
    <div className="listCultures">
      <div className="title">
        <h1>Data Ritus</h1>
      </div>
      <Datatable
        rows={cultures}
        columns={provinceColumns}
        handleDelete={handleDelete}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ListCultures;
