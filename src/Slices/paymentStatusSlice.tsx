

// slices/paymentStatusSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../Redux/store";

interface PaymentStatusState {
    isPaymentResultPageActive: boolean;
}

const initialState: PaymentStatusState = {
    isPaymentResultPageActive: false,
};

const paymentStatusSlice = createSlice({
    name: 'paymentStatus',
    initialState,
    reducers: {
        setPaymentResultPageActive(state, action: PayloadAction<boolean>) {
            state.isPaymentResultPageActive = action.payload;
        },
    },
});

export const { setPaymentResultPageActive } = paymentStatusSlice.actions;
export const selectPaymentResultPageActive = (state: RootState) => state.paymentStatus.isPaymentResultPageActive;
export default paymentStatusSlice.reducer;
