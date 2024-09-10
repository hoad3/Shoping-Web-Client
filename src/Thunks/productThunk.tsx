import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const PRODUCTS_LIMIT = 4;

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page: number, { rejectWithValue }) => {
        console.log('Fetching products for page:', page);
        try {
            const response = await axios.get(`http://localhost:5295/Get_All_Produc?page=${page}&limit=${PRODUCTS_LIMIT}`);
            console.log('true product',response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error as Error || 'Có lỗi xảy ra');
        }
    }
);


