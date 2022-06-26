import React from "react";
import "./textfield.scss";
import { useField } from "formik";

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="textField">
            <label htmlFor="">{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextField;
