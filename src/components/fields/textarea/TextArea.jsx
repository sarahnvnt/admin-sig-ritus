import React from "react";
import "./textarea.scss";
import { useField } from "formik";

const TextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="textArea">
            <label htmlFor="">{label}</label>
            <textarea
                id=""
                cols="30"
                rows="10"
                {...field}
                {...props}
            ></textarea>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};
export default TextArea;
