import React, { useEffect, useRef, useState } from "react";
import TextField from "../../components/fields/textfield/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import "./edituser.scss";
import { getUser, updateUser } from "../../redux/apiCalls";
import { useLocation } from "react-router-dom";

const EditUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({});
  const [tes, setTes] = useState();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const formRef = useRef();

  useEffect(() => {
    getUser(id, setUser);
  }, []);

  // useEffect(() => {
  //     if (formRef.current) {
  //         // console.log(tes);
  //     }
  // }, [tes]);

  // console.log(tes);
  // console.log(formRef.current?.values?.password);

  const handleValid = () => {
    console.log(formRef.current.values);
    // if (formRef.current.password) {
    // setTes({
    //     username: Yup.string()
    //         .required("Harus diisi")
    //         .max(15, "Username maksimal 15 karakter ")
    //         .min(6, "Username minimal 6 karakter "),
    //     password: Yup.string()
    //         .required("Harus diisi")
    //         .matches(
    //             /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    //             "Password Minimal 8 karakter, Satu huruf besar, Satu huruf kecil, Satu angka dan satu simbol"
    //         ),
    //     confirmPassword: Yup.string()
    //         .required("Harus diisi")
    //         .required("Konfirmasi password harus diisi")
    //         .oneOf([Yup.ref("password"), null], "Password harus sama"),
    // });
    // } else {
    // }
  };

  console.log(tes);

  // const handleVal = (event: FormEvent) => {
  // console.log("Form::onChange", event);
  // };

  const FormObserver: React.FC = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      // console.log("FormObserver::values", values);
      setTes(values);
    }, [values]);

    return null;
  };

  return (
    <div className="editUser">
      <Formik
        initialValues={{
          username: user.username,
          password: "",
          confirmPassword: "",
        }}
        enableReinitialize
        validationSchema={
          tes?.password
            ? Yup.object({
                username: Yup.string()
                  .required("Harus diisi")
                  .max(15, "Username maksimal 15 karakter ")
                  .min(6, "Username minimal 6 karakter "),
                password: Yup.string()
                  .required("Harus diisi")
                  .matches(
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                    "Password Minimal 8 karakter, Satu huruf besar, Satu huruf kecil, Satu angka dan satu simbol"
                  ),
                confirmPassword: Yup.string()
                  .required("Harus diisi")
                  .required("Konfirmasi password harus diisi")
                  .oneOf([Yup.ref("password"), null], "Password harus sama"),
              })
            : Yup.object({
                username: Yup.string()
                  .required("Harus diisi")
                  .max(15, "Username maksimal 15 karakter ")
                  .min(6, "Username minimal 6 karakter "),
              })
        }
        onSubmit={(values) => {
          setIsSubmitting(true);
          const input = values;
          updateUser(id, input, setIsSubmitting, toast);
        }}
        innerRef={formRef}
      >
        <Form className="editUser">
          <TextField
            label="Username"
            type="text"
            name="username"
            placeholder="Username"
          />
          <FormObserver />

          <TextField
            label="Password"
            type="text"
            name="password"
            placeholder="Masukkan Password"
            ref={formRef}
          />
          <TextField
            label="Konfirmasi Password "
            type="text"
            name="confirmPassword"
            placeholder="Konfirmasi Password "
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

export default EditUser;
