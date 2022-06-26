import { createSlice } from "@reduxjs/toolkit";

export const culturesSlice = createSlice({
    name: "cultures",
    initialState: {
        cultures: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getCulturesStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getCulturesSuccess: (state, action) => {
            state.isFetching = false;
            state.cultures = action.payload;
        },
        getCulturesFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteCulturesStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteCulturesSuccess: (state, action) => {
            state.isFetching = false;
            state.cultures.splice(
                state.cultures.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteCulturesFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getCulturesStart,
    getCulturesSuccess,
    getCulturesFailure,
    deleteCulturesStart,
    deleteCulturesSuccess,
    deleteCulturesFailure,
} = culturesSlice.actions;

export default culturesSlice.reducer;
