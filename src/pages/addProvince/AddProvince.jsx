import React, { useEffect, useState } from "react";
import TextArea from "../../components/fields/textarea/TextArea";
import TextField from "../../components/fields/textfield/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./addprovince.scss";
import { addProvince } from "../../redux/apiCalls";

const AddProvince = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <div className="addProvince">
            <Formik
                initialValues={{
                    name: "",
                    lat: null,
                    long: null,
                    geojson: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Harus diisi"),
                    lat: Yup.number()
                        .typeError("Harus berupa angka")
                        .required("Harus diisi"),
                    long: Yup.number()
                        .typeError("Harus berupa angka")
                        .required("Harus diisi"),
                    geojson: Yup.string().required("Harus diisi"),
                })}
                onSubmit={(values) => {
                    setIsSubmitting(true);
                    const province = {
                        ...values,
                        geojson: JSON.parse(values.geojson),
                    };

                    addProvince(province, toast, setIsSubmitting);
                }}
            >
                <Form className="addProvince">
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
                                    `}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <CircularProgress
                                color="inherit"
                                size="1.7rem"
                                thickness={5}
                            />
                        ) : (
                            "Tambah"
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

export default AddProvince;
