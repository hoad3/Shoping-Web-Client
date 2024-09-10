import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserInfo} from "../Types/TypeInfor";
import { fetchUserInfoRequest, fetchUserInfoSuccess, fetchUserInfoFailure } from '../Slices/informationUserSlice';
import { RootState } from '../Redux/store';
import {selectUserId} from "../Slices/authSlice";
import axios from "axios/index";
interface FetchUserInfoByUserIdArgs {
    userid: string;
}
export const fetchInformationsByUserid = createAsyncThunk(
    'information/fetchByUserId',
    async (_,{dispatch,getState}) =>{
        const state = getState() as RootState;
        const userid = selectUserId(state);
        try {
            dispatch(fetchUserInfoRequest());
            const response = await fetch(`http://localhost:5295/API/Find_Information_User/${userid}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('day la du lieu', data)
            dispatch(fetchUserInfoSuccess(data))
            return data;

        } catch (error) {
            dispatch(fetchUserInfoFailure((error as Error).message));
            throw error;
        }
    }
);

export const addInfoUser = createAsyncThunk(
    'user/addUserInfo',
    async (userInfo: UserInfo, { rejectWithValue }) => {
        try {
            // Gửi request tới API
            const response = await fetch('http://localhost:5295/api/AddInformation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });

            // Kiểm tra nếu phản hồi không thành công (status code không phải 2xx)
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData || 'Có lỗi xảy ra.....');
            }

            // Chờ và parse dữ liệu JSON từ phản hồi
            const data = await response.json();
            console.log('thong tin user:', data);
            return data;

        } catch (error) {
            // Xử lý lỗi ngoại lệ
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return rejectWithValue(error.message || 'Có lỗi xảy ra.....');
        }
    }
);

// Thunk to update user information
export const updateInfoUser = createAsyncThunk(
    'user/updateUserInfo',
    async (updatedUserInfo: UserInfo, { rejectWithValue }) => {
        try {
            // Gọi API PUT để cập nhật thông tin người dùng

            const response = await fetch('http://localhost:5295/api/UpdateInformation', {
                    method: 'PUT', // Phương thức PUT cho cập nhật
                    headers: {
                        'Content-Type': 'application/json', // Định dạng dữ liệu là JSON
                    },
                    body: JSON.stringify(updatedUserInfo), // Chuyển đổi đối tượng thành chuỗi JSON
                });
            const data = await response.json()
            // Trả về dữ liệu nếu thành công
            console.log('update user:', data)
            return data;
        } catch (error) {
            // Bắt lỗi nếu API thất bại
            return rejectWithValue(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                error.response?.data || 'Có lỗi xảy ra khi cập nhật thông tin...'
            );
        }
    }
);