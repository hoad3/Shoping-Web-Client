
// Định nghĩa URL của API
import {createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = 'http://localhost:5295/api/Mail/send-otp';

interface SendOtpPayload {
    recipientEmail: string;
}

export const sendOtp = createAsyncThunk(
    'otp/sendOtp',
    async (payload: SendOtpPayload, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipientEmail: payload.recipientEmail,
                    subject: "Your OTP Code",
                    message: "Please use this OTP to verify your account.",
                }),
            });

            if (!response.ok) {
                // Kiểm tra nếu không thành công, lấy lỗi từ response
                const errorData = await response.text();
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            console.log('Send Email', data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);



// Định nghĩa kiểu cho payload
interface VerifyOtpPayload {
    email: string;
    otp: string;
}

export const verifyOtp = createAsyncThunk(
    'otp/verifyOtp',
    async (payload: VerifyOtpPayload, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5295/api/Mail/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Sử dụng payload thay vì { email, otp }
            });

            if (!response.ok) {
                const errorData = await response.text();
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            console.log('verifyOtp', data)
            return data; // Trả về dữ liệu nếu thành công
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);