// deliverySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState} from "../Redux/store";

// Thunk để lấy thông tin giao hàng bằng idshipper
export const fetchDeliveryByShipperID = createAsyncThunk(
    'delivery/fetchDeliveryByShipperID',
    async (idshipper, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5295/GetDeliverybyShipperID/${idshipper}`);
            const data = await response.json();
            return data;  // Trả về data từ API
        } catch (error) {
            return rejectWithValue('Failed to fetch delivery data');
        }
    }
);

// Tạo slice để quản lý state liên quan đến delivery
const shipperDelivery = createSlice({
    name: 'delivery',
    initialState: {
        shipperDeliveryData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveryByShipperID.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeliveryByShipperID.fulfilled, (state, action) => {
                state.loading = false;
                state.shipperDeliveryData = action.payload;
            })
            .addCase(fetchDeliveryByShipperID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default shipperDelivery.reducer;

export const selectDeliveryData = (state) => state.shipperDelivery.shipperDeliveryData;
