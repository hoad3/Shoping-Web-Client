
// Thunk để thêm đơn hàng
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {selectUserId} from "../Slices/authSlice";
import {RootState} from "../Redux/store";
import {useSelector} from "react-redux";
// import {fetchProductsFailure} from "../Slices/userProductSlice";


export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (orderData, { rejectWithValue }) => {


        try {
            const response = await axios.post('http://localhost:5295/Thanhtoan', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error as Error);
        }
    }
);

export const addDonhang = createAsyncThunk(
    'adddonhang/donhang',
    async (donhangdata) => {
        try {
            const response = await fetch('http://localhost:5295/Donmua', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donhangdata),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Đơn hàng đã được tạo thành công:', data);
                // Điều hướng đến trang khác hoặc thông báo cho người dùng
            } else {
                console.error('Có lỗi khi tạo đơn hàng');
            }
        } catch (error) {
            console.error('Lỗi kết nối API:', error);
        }
    }
)

export const getdonhang = createAsyncThunk(
    'getdonhang/donhang',
    async (_,{getState,rejectWithValue }) => {
        const state = getState() as RootState;
        const userid = selectUserId(state); // Lấy userid từ state
        try {
            const response = await fetch(`http://localhost:5295/Get_donmua_userID/${userid}`,{
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
            });
            if (!response.ok) {
                return rejectWithValue('Network response was not ok');
            }
            const data = await response.json();
            console.log("id cart", data)
            console.log('API response data:', data); // Thêm log để kiểm tra dữ liệu trả về
            return data;
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(rejectWithValue(error.message()));
            throw error;
        }
    }

);

export const HandleOrder = createAsyncThunk(
    'handleOder/Thanhtoan',
        async (_,{getState,rejectWithValue }) => {
            const state = getState() as RootState;
            const userid = selectUserId(state); // Lấy userid từ state
            try {
                const response = await fetch(`http://localhost:5295/Get_ThanhToan/${userid}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    return rejectWithValue('Network response was not ok');
                }
                const data = await response.json();
                console.log("id cart", data)
                console.log('API response data:', data); // Thêm log để kiểm tra dữ liệu trả về
                return data;
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(rejectWithValue(error.message()));
                throw error;
            }
        }
);

export const OrderStatus = createAsyncThunk(
    'OrderStatus/Thanhtoan',
    async ({ id, trangthaidonhang }: { id: number, trangthaidonhang: number }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5295/UpdateTrangThaiDonHang/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trangthaidonhang), // Gửi trạng thái đơn hàng dưới dạng số nguyên
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Failed to update order status');
            }

            const data = await response.json();
            return data; // Trả về dữ liệu sau khi cập nhật thành công
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)
