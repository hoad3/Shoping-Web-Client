import { createAsyncThunk } from '@reduxjs/toolkit';
// import { UserProduct } from '../Types/TypeProduct';
import { fetchProductsRequest,fetchProductsSuccess, fetchProductsFailure } from '../Slices/userProductSlice';
import { selectUserId } from '../Slices/authSlice';
import { RootState } from '../Redux/store';
import {Product} from "../Slices/productSlice";
import axios from "axios";
// Define the type of the thunk argument, in this case, `userid`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FetchProductsByUserIdArgs {
    userid: string;
}

// Define the thunk without argument since userId will be fetched from the state
export const fetchProductsByUserId = createAsyncThunk<Product[], void>(
    'products/fetchByUserId',
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;
        const userid = selectUserId(state);

        if (!userid) {
            console.log("no product")
            throw new Error('User ID is not available');
        }

        try {
            dispatch(fetchProductsRequest());
            const response = await fetch(`http://localhost:5295/Find_Product_UserId/${userid}`);
            console.log("user product",response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("id cart",data)
            dispatch(fetchProductsSuccess(data))
            console.log('API response data:', data); // Thêm log để kiểm tra dữ liệu trả về
            return data;
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(fetchProductsFailure(error.message()));
            throw error;
        }
    }
);

export const deleteUserProduct  = createAsyncThunk(
    'cart/deleteCartItem',
    async (Id: number,{ rejectWithValue }) =>{
        try{
            const response = await axios.delete(`http://localhost:5295/DeleteProduct?id=${Id}`)
            console.log('da xoa:',response.data)
            return response
        }
        catch (error) {
            // Trả về lỗi nếu có vấn đề với request
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return rejectWithValue(error.message());
        }
    }
)
