import {updateThanhtoanState} from "../Thunks/PayhandleThunk";
import {createSlice} from "@reduxjs/toolkit";


interface PaymentState {
    updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PaymentState = {
    updateStatus: 'idle',
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateThanhtoanState.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null;
            })
            .addCase(updateThanhtoanState.fulfilled, (state) => {
                state.updateStatus = 'succeeded';
            })
            .addCase(updateThanhtoanState.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default paymentSlice.reducer;