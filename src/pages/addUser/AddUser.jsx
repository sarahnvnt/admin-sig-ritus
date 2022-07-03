import React, { useState } from "react";
import TextField from "../../components/fields/textfield/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./adduser.scss";
import { addUser } from "../../redux/apiCalls";

const AddUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="addUser">
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Username Wajib diisi")
            .max(13, "Username maksimal 13 karakter ")
            .min(7, "Username minimal 7 karakter "),
          password: Yup.string()
            .required("Password Wajib diisi")
            .matches(
              /^(?=.*[0-7])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
              "Password Min 7 karakter, huruf besar, huruf kecil, angka dan simbol"
            ),
          confirmPassword: Yup.string()
            .required("Password Wajib diisi")
            .required("Konfirmasi password ")
            .oneOf([Yup.ref("password"), null], "Password Harus Sama"),
        })}
        onSubmit={(values) => {
          setIsSubmitting(true);
          const input = values;
          addUser(input, toast, setIsSubmitting);
        }}
      >
        <Form className="addUser">
          <TextField
            label="Username"
            type="text"
            name="username"
            placeholder="admin123"
          />

          <TextField
            label="Password"
            type="text"
            name="password"
            placeholder="Masukkan Password"
          />
          <TextField
            label="Konfirmasi Password"
            type="text"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircularProgress color="inherit" size="1.7rem" thickness={5} />
            ) : (
              "Tambahkan Admin"
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

export default AddUser;
