import React, { useEffect, useState } from "react";
import TextArea from "../../components/fields/textarea/TextArea";
import TextField from "../../components/fields/textfield/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./editprovince.scss";
import { useLocation } from "react-router-dom";
import { getProvince, updateProvince } from "../../redux/apiCalls";

const EditProvince = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [province, setProvince] = useState({});
  const location = useLocation();
  const provinceId = location.pathname.split("/")[2];
  console.log(province);

  useEffect(() => {
    getProvince(provinceId, setProvince);
  }, []);

  return (
    <div className="editProvince">
      <Formik
        initialValues={{
          name: province.name,
          lat: province.lat,
          long: province.long,
          geojson: JSON.stringify(province.geojson),
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required("Nama Provinsi Harus diisi"),
          lat: Yup.number().required("Latitude Harus diisi"),
          long: Yup.number().required("Longitude Harus diisi"),
          geojson: Yup.string().required("Geojson Harus diisi"),
        })}
        onSubmit={(values) => {
          setIsSubmitting(true);
          const province = {
            ...values,
            geojson: JSON.parse(values.geojson),
          };

          console.log(province);
          updateProvince(provinceId, province, setIsSubmitting, toast);
        }}
      >
        <Form className="editProvince">
          <TextField
            label="Nama Provinsi"
            type="text"
            name="name"
            placeholder="Jawa Barat"
          />

          <div className="wrap">
            <TextField
              label="Latitude"
              type="number"
              name="lat"
              placeholder="-9.039485"
            />
            <TextField
              label="Longitude"
              type="number"
              name="long"
              placeholder="92.2398"
            />
          </div>

          <TextArea
            label="Geojson"
            name="geojson"
            placeholder={`{
                            "type": "Feature",
                            "geometry": {
                              "type": "MultiPolygon",
                              "coordinates": [
                                [
                                  [
                                    [110.1698084443043, -2.8529116617437467],
                                    [110.1520077259758, -2.8829539688505292],
                                    [110.14665837228614, -2.8986491647271464],
                                    [110.17199421596035, -2.9149818962974337],
                                    [110.20061433068685, -2.893346489448902],
                                    [110.20170740717117, -2.883666436956446],
                                    [110.1698084443043, -2.8529116617437467]`}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircularProgress color="inherit" size="1.7rem" thickness={5} />
            ) : (
              "Simpan"
            )}
          </button>
        </Form>
      </Formik>
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

export default EditProvince;
