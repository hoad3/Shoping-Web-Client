import {createAsyncThunk} from "@reduxjs/toolkit";
import errorNoCart from "../Error/errorNoCart";
// import axios from "axios";


export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async ({ cartId, productId }: { cartId: number; productId: number }, { rejectWithValue }) => {
        console.log("Sending request with Cart ID:", cartId);
        console.log("Sending request with Product ID:", productId);
        try {
            const response = await fetch(`http://localhost:5295/AddCartItem/${cartId}/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItemId: 0, // Bạn có thể cần giữ cái này nếu server yêu cầu
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add cart item');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);
