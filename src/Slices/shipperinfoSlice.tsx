import { createSlice } from '@reduxjs/toolkit';
import { fetchShipperByUserId } from '../Thunks/DeliveryThunk'; // Giả sử file thunk của bạn là shipperThunk.js

const initialState = {
    shipper: null,  // Dữ liệu shipper ban đầu là null
    loading: false,
    error: null,
};

const shipperSlice = createSlice({
    name: 'shipper',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShipperByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShipperByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.shipper = action.payload;  // Lưu thông tin shipper vào state
            })
            .addCase(fetchShipperByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;  // Lưu lỗi vào state nếu API thất bại
            });
    },
});

export default shipperSlice.reducer;

// Selector để lấy thông tin shipper từ Redux store
export const selectShipper = (state) => state.shipperinfor.shipper;

// Selector để lấy shipperId
export const selectShipperId = (state) => state.shipperinfor.shipper?.idshipper;
