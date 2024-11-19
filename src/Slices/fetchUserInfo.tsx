import {fetchUserInfo} from "../Thunks/informationUserThunk";
import {createSlice} from "@reduxjs/toolkit";


const userInfoReducer = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: null,
        // Các trạng thái khác nếu cần
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload; // Cập nhật userInfo từ API
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload; // Lưu thông tin người dùng vào state
            });
    },
});

// Xuất reducer
export const { setUserInfo } = userInfoReducer.actions;
export default userInfoReducer.reducer;
