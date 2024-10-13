import {addOrder} from "../Thunks/paymentThunks";
import {createSlice} from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.order = action.payload;
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.status = 'failed';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer