import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isLoggedIn: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.isLoggedIn = false;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
            state.isLoggedIn = true;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.isLoggedIn = false;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.isLoggedIn = false;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isLoggedIn = false;
            state.error = false;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.isLoggedIn = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },

        //UPDATE
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser.others = action.payload;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerFailure,
    registerStart,
    registerSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
