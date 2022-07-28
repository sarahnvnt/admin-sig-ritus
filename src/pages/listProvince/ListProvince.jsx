import React, { useEffect, useState } from "react";
import Datatable from "../../components/datatable/Datatable";
import { deleteProvince, getProvinces } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./listprovince.scss";

const ListProvince = () => {
  const [provs, setProvs] = useState([]);
  const dispatch = useDispatch();
  const { provinces, isFetching } = useSelector((state) => state.provinces);

  useEffect(() => {
    getProvinces(dispatch);
  }, []);

  const handleDelete = (id) => {
    deleteProvince(id, dispatch, toast);
    console.log(id);
  };

  const provinceColumns = [
    // { field: "_id", headerName: "ID", minWidth: 100, flex: 1 },
    {
      field: "name",
      headerName: "Nama Provinsi",
      minWidth: 200,
      flex: 1,

      renderCell: (params) => {
        return params.row.name;
      },
    },
    {
      field: "lat",
      headerName: "Latitude",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "long",
      headerName: "Longitude",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "geojson",
      headerName: "Geojson",
      minWidth: 200,
      flex: 1,

      renderCell: (params) => {
        return JSON.stringify(params.row.geojson);
      },
    },
  ];

  return (
    <div className="listProvince">
      <div className="title">
        <h1>Data Provinsi</h1>
      </div>
      <Datatable
        rows={provinces}
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

export default ListProvince;
