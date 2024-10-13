import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const addDelivery = createAsyncThunk(
    'delivery/addDelivery',
    async (deliveryData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5295/AddDelivery', deliveryData);
            return response.data; // Trả về dữ liệu nếu API trả về thành công
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return rejectWithValue(error.response.data); // Xử lý lỗi nếu API trả về lỗi
        }
    }
);

export const fetchShippers = createAsyncThunk (
    'shipper/getshipper',
    async (  rejectWithValue) => {

        try {
            const response = await axios.get('http://localhost:5295/GetAllShipperAsync'); // Gọi API
            return  response.data; // Lưu danh sách shipper vào state
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return rejectWithValue(error.response.data); // Xử lý lỗi nếu API trả về lỗi
        }
    }
);
export const fetchDeliveryData = createAsyncThunk(
    'delivery/fetchDeliveryData',
    async (shipperId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5295/GetDeliverybyShipperID/${shipperId}`);
            return response.data; // Trả về dữ liệu nhận được
        } catch (error) {
            return rejectWithValue((error as Error).message); // Xử lý lỗi
        }
    }
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const fetchShipperInfo = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5295/GetShipperByUserId/${userId}`);
        dispatch({
            type: 'FETCH_SHIPPER_SUCCESS',
            payload: response.data
        });
    } catch (error) {

        dispatch({
            type: 'FETCH_SHIPPER_FAILURE',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            payload: error.message
        });
    }
};