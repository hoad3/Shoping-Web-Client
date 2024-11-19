import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchDeliveryData} from "../Thunks/DeliveryThunk";


interface Delivery {
    soluong: number;
    dongia: number;
    tongtien: number;
    ngaythanhtoan: string;
    trangthaidonhang: number;
    nguoimua: string;
    nguoiban: string;
    trangthaithanhtoan: number;
}

interface DeliveryState {
    deliveryData: Delivery | null;
    loading: boolean;
    error: string | null;
}

const initialState: DeliveryState = {
    deliveryData: null,
    loading: false,
    error: null,
};

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeliveryData.fulfilled, (state, action: PayloadAction<Delivery>) => {
                state.deliveryData = action.payload;
                state.loading = false;
            })
            .addCase(fetchDeliveryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default deliverySlice.reducer;