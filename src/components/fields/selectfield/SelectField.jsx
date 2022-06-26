import React from "react";
import "./selectfield.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useField } from "formik";

const SelectField = ({ options, label, ...props }) => {
    const [field, meta, helpers] = useField(props.name);

    const { value } = meta;
    const { setValue } = helpers;

    return (
        <FormControl
            size="medium"
            sx={{ minWidth: 150 }}
            className="selectField"
        >
            <label htmlFor="">{label}</label>
            <Select
                {...field}
                SelectDisplayProps={{
                    style: { paddingBlock: 5 },
                }}
                value={value}
                displayEmpty
                onChange={(event) => setValue(event.target.value)}
                renderValue={
                    value !== "" ? undefined : () => <>Pilih {label}</>
                }
                inputProps={{
                    "aria-label": "Without label",
                }}
                classes={{
                    select: "select",
                    icon: "select-icon",
                }}
            >
                <MenuItem value="">None</MenuItem>
                {label === "Provinsi"
                    ? options.map((option) => (
                          <MenuItem value={option._id}>{option.name}</MenuItem>
                      ))
                    : options.map((option) => (
                          <MenuItem value={option.value}>
                              {option.label}
                          </MenuItem>
                      ))}
                {/* <MenuItem value={1}>Sulawesi Tenggaraaaaaaaa</MenuItem>
                <MenuItem value={2}>Jawa Barat</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem> */}
            </Select>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </FormControl>
    );
};

export default SelectField;
