import {fetchShippers} from "../Thunks/DeliveryThunk";
import {createSlice} from "@reduxjs/toolkit";



// Định nghĩa kiểu Shipper
export type Shipper = {
  idshipper: number;
  shippername: string;
  shipperphone: number; // Để tránh lỗi kiểu dữ liệu, bạn có thể để là string
  status: number;
};

// Định nghĩa kiểu trạng thái cho Shipper
export interface ShipperState {
  shippers: Shipper[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShipperState = {
  shippers: [],
  status: 'idle',
  error: null,
};

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