import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../Slices/productSlice'; // Đường dẫn tới file chứa Product

// Định nghĩa Thunk để thêm sản phẩm

// Tạo một Thunk để thêm sản phẩm
// Thunk để thêm Product
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData: Omit<Product, 'id'>, { rejectWithValue }) => {
        try {
            const response = await axios.put('http://localhost:5295/AddProduct', productData);
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            if (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('Something went wrong');
        }
    }
);