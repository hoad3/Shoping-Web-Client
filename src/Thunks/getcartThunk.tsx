import {createAsyncThunk} from "@reduxjs/toolkit";
import { fetchCartRequest, fetchCartSuccess, fetchCartFailure } from '../Slices/getCartSlice';
import {fetchProductsByCartId} from "./cartItemThunk";
import {TypegetCart} from "../Types/TypegetCart";



export const FetchCartsByUserId = createAsyncThunk(
    'cart/fetchByUserId',
    async ({ userid }: { userid: number }, { dispatch }) => {
        try {
            dispatch(fetchCartRequest());

            const response = await fetch(`http://localhost:5295/CartID/${userid}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }

            const data = await response.json();

            // const cartId = data.cartId;
            const { cartId, createdAt } = data;
            dispatch(fetchCartSuccess({cartId, userid, createdAt}));

            // Sau khi có `cartId`, ta gọi `fetchCartItemsByCartId`
            dispatch(fetchProductsByCartId(cartId))
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(fetchCartFailure(error.message));
        }
    }
);

// Thunk để gọi API tạo giỏ hàng
export const createCart  = createAsyncThunk(
    'cart/createCart',
    async (payload: TypegetCart, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5295/AddCart', {
                method: 'POST',
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to create cart');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);