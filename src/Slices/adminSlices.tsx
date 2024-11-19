


// Định nghĩa kiểu cho User
import { createSlice} from "@reduxjs/toolkit";

import {fetchAdminUsers, searchUsers} from "../Thunks/adminThunk";

// Định nghĩa kiểu cho Admin
// Định nghĩa kiểu cho Admin
interface Admin {
  id: number;
  account: string;
  password: string;
  role: number;
  // Các thuộc tính khác
}

interface AdminState {
  admins: Admin[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admins: [],
  loading: false,
  error: null,
};

// Tạo thunk để lấy dữ liệu người dùng


// Tạo slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchAdminUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAdminUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.admins = action.payload;
        })
        .addCase(fetchAdminUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';

        })
        .addCase(searchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(searchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.admins = action.payload; // Giả sử payload là danh sách người dùng
        })
        .addCase(searchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message|| 'Something went wrong';
        });

  },
});

// Xuất reducer và thunk
export default adminSlice.reducer;
// Chỉ xuất thunk mà không cần destructure từ slice
