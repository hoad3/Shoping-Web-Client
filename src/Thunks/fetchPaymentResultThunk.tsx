import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPaymentResult = createAsyncThunk(
    'payment/fetchPaymentResult',
    async (paymentId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5295/api/Payment/PaymentResult?paymentId=${paymentId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch payment result');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);