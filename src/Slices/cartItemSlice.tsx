import {Product} from "./productSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../Redux/store";


interface cartItem{
    cartItemId: number;
    cartId: number;
    productId: number;
    product: Product;
}
interface cartItemState {
    cartItem: cartItem[];
    loading: boolean;
    error: string | null;
}

// Khởi tạo giá trị ban đầu cho state
const initialState: cartItemState = {
    cartItem: [],
    loading: false,
    error: null,
};

// Tạo Slice cho CartItem
const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState,
    reducers: {
        fetchCartItemsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCartItemsSuccess: (state, action: PayloadAction<cartItem[]>) => {
            state.cartItem = action.payload;
            state.loading = false;

        },
        fetchCartItemsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchCartItemsRequest, fetchCartItemsSuccess, fetchCartItemsFailure } = cartItemSlice.actions;

export default cartItemSlice.reducer;

// Selector để lấy dữ liệu từ state
export const selectCartItems = (state: RootState) => state.cartItem.cartItem;
export const selectCartItemIds = (state: RootState) => state.cartItem.cartItem.map(item => item.cartItemId);
export const selectCartItemsLoading = (state: RootState) => state.cartItem.loading;
export const selectCartItemsError = (state: RootState) => state.cartItem.error;