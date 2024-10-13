// src/thunks/authThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../Slices/authSlice';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { account: string; password: string }, { dispatch }) => {
        dispatch(loginRequest());
        try {
            const response = await axios.post('http://localhost:5295/login', credentials);
            const { data } = response;
            console.log("data:",data)
            // Lưu token vào localStorage (hoặc sessionStorage)
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userid', data.userid);
            localStorage.setItem('role', data.role)
            dispatch(loginSuccess({ userid: data.userid, role: data.role ,token: data.token }));

        } catch (error) {
            dispatch(loginFailure((error as Error).message));
        }

    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { account: string; password: string, role: 1 }, { dispatch }) => {
        try {
            const response = await axios.post('http://localhost:5295/register', credentials);
            const { data } = response;

            // Đăng ký thành công, bạn có thể tự động đăng nhập người dùng
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(loginSuccess({ userid: data.userid, token: data.token }));

            // Hoặc chỉ trả về thông tin đăng ký thành công
            return { userid: data.userid, token: data.token };
        } catch (error) {
            dispatch(loginFailure((error as Error).message));
            throw error;
        }
    }
);
