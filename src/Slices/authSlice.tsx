// src/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../Redux/store";
// import {useNavigate} from "react-router-dom";

interface AuthState {
    userid: number | null;
    role: number | null;
    token: string | null;
    error: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    userid: localStorage.getItem('userid') ? JSON.parse(localStorage.getItem('userid') as string) : null,
    role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role') as string) : null,
    token: localStorage.getItem('authToken'),
    error: null,
    loading: false,


};
// eslint-disable-next-line react-hooks/rules-of-hooks
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ userid: number; role: number; token: string }>) => {
            state.userid = action.payload.userid;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.loading = false;

            console.log('Reducer: loginSuccess', state.userid, state.role, state.token);

        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.userid = null;
            state.role = null;
            state.token = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('userid');
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure,logout } = authSlice.actions;

export default authSlice.reducer;
export const selectUserId = (state: RootState) => state.auth.userid;