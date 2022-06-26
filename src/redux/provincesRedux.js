import { createSlice } from "@reduxjs/toolkit";

export const provincesSlice = createSlice({
    name: "provinces",
    initialState: {
        provinces: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getProvincesStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProvincesSuccess: (state, action) => {
            state.isFetching = false;
            state.provinces = action.payload;
        },
        getProvincesFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteProvincesStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProvincesSuccess: (state, action) => {
            state.isFetching = false;
            state.provinces.splice(
                state.provinces.findIndex(
                    (item) => item._id === action.payload
                ),
                1
            );
        },
        deleteProvincesFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getProvincesStart,
    getProvincesSuccess,
    getProvincesFailure,
    deleteProvincesStart,
    deleteProvincesSuccess,
    deleteProvincesFailure,
} = provincesSlice.actions;

export default provincesSlice.reducer;
