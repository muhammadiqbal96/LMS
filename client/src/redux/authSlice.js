import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        loginTimestamp: localStorage.getItem("loginTimestamp") || null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },

        login: (state) => {
            state.loginTimestamp = Date.now();
            localStorage.setItem("loginTimestamp", state.loginTimestamp);
        },
        logout: (state) => {
            state.user = null;
            state.loginTimestamp = null;
            localStorage.removeItem("loginTimestamp");
        },
    }
});
export const { setLoading, setUser, login, logout } = authSlice.actions;
export default authSlice.reducer;

export const checkLoginExpiry = () => (dispatch) => {
    const savedTimestamp = localStorage.getItem("loginTimestamp");

    if (savedTimestamp && Date.now() - savedTimestamp > 24 * 60 * 60 * 1000) {
        dispatch(logout());
    }
};