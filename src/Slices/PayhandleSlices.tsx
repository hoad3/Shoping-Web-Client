import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PaymentState {
    paymentUrl: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    paymentUrl: null,
    loading: false,
    error: null,
};

const PayhandleSlices = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        paymentRequest(state) {
            state.loading = true;
            state.error = null;
        },
        paymentSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.paymentUrl = action.payload;
        },
        paymentFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Xuất các action và reducer
export const { paymentRequest, paymentSuccess, paymentFailure } = PayhandleSlices.actions;
export default PayhandleSlices.reducer;