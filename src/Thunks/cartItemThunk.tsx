import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchProductsFailure, fetchProductsRequest} from "../Slices/userProductSlice";
import {fetchCartItemsSuccess} from "../Slices/cartItemSlice";

export const fetchProductsByCartId = createAsyncThunk(
    'products/fetchByCartId',
    async (cartId: number, { dispatch }) => {
        try {
            dispatch(fetchProductsRequest()); // Action to set loading state

            const response = await fetch(`http://localhost:5295/Get_Item_Shoping/${cartId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            console.log("sdasdasd",data)
            dispatch(fetchCartItemsSuccess(data))
        } catch (error) {
            console.error('Error fetching products:', error); // Log the error
            dispatch(fetchProductsFailure((error as Error).message)); // Action to handle errors
        }
    }
);

