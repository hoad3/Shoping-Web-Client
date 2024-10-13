// shipperSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import { Shipper } from '../Types/TypeShipper';
import {fetchShippers} from "../Thunks/DeliveryThunk"; // Đảm bảo đường dẫn chính xác

interface ShipperState {
    shippers: Shipper[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ShipperState = {
    shippers: [],
    status: 'idle',
    error: null,
};

// Tạo async thunk để fetch shipper
// Tạo slice
const shipperSlice = createSlice({
    name: 'shippers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShippers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShippers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.shippers = action.payload; // Lưu shipper vào state
            })
            .addCase(fetchShippers.rejected, (state, action) => {
                state.status = 'failed';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                state.error = action.payload;
            });
    },
});

// Xuất reducer
export default shipperSlice.reducer;
