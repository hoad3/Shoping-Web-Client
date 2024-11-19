// src/Slices/otpSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import {sendOtp, verifyOtp} from '../Thunks/OTP';

interface OtpState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: OtpState = {
    loading: false,
    success: false,
    error: null,
};

const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        resetOtpState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                state.error = action.payload; // Ghi lại lỗi
            });
    },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
