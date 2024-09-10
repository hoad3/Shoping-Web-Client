import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../Slices/authSlice";
import productSlice from "../Slices/productSlice";
import userproductSlice from '../Slices/userProductSlice'
import informationUserSlice from "../Slices/informationUserSlice";
import getCartSlice from "../Slices/getCartSlice"
import cartItemSlice from "../Slices/cartItemSlice"

// Tạo Redux store
export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        userproduct:userproductSlice,
        userInfo: informationUserSlice,
        getCartSlice: getCartSlice,
        cartItem:cartItemSlice,

    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;