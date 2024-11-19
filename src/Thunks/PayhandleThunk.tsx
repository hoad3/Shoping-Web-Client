import {AppDispatch} from "../Redux/store";
import {paymentFailure, paymentRequest, paymentSuccess} from "../Slices/PayhandleSlices";
import {createAsyncThunk} from "@reduxjs/toolkit";


export interface Invoice {
    invoiceId: number;
    memberId: number;
    invoiceDate: string;
    givenName: string;
    surname: string;
    phone: number;
    address: string;
    amount: number;
    invoiceDetails: { invoiceId: number; productId: number; price: number; quantity: number }[];
}

export const createPayment = (invoice: Invoice) => {
    return async (dispatch: AppDispatch) => {
        dispatch(paymentRequest());

        try {
            const response = await fetch('https://localhost:7098/api/Payment/CreatePayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoice),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment');
            }

            const data = await response.json();
            dispatch(paymentSuccess(data.paymentUrl));

            // Chuyển hướng đến VNPay
            window.location.href = data.paymentUrl; // Chuyển hướng ngay lập tức
        } catch (error) {
            dispatch(paymentFailure(error.message));
        }
    };
};

export const updateThanhtoanState = createAsyncThunk(
    'payment/updateThanhtoanState',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:7098/UpdateThanhtoanState?Id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update transaction state');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);