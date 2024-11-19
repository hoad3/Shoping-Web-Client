import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../Slices/authSlice";
import productSlice from "../Slices/productSlice";
import userproductSlice from '../Slices/userProductSlice'
import informationUserSlice from "../Slices/informationUserSlice";
import getCartSlice from "../Slices/getCartSlice"
import cartItemSlice from "../Slices/cartItemSlice"
import orderReducer from "../Slices/paymentSlice"
import checkoutReducer from "../Slices/checkoutSlice"
import deliveryReducer from "../Slices/DeliverySlices"
import shipperReducer from "../Slices/shipperSlice"
import shipperInforReducer from "../Slices/shipperinfoSlice"
import shipperDelivery from "../Slices/shipperDelivery"
import adminUser from "../Slices/adminSlices"
import adminProduct from "../Slices/adminProductSlice"
import otpReducer from "../Slices/OTPSlice"
import PayhandleSlices from "../Slices/PayhandleSlices"
import paymentStatusSlice from "../Slices/paymentStatusSlice"
import UpdateStatuspayment from "../Slices/UpdateStatuspayment";
import fetchUserInfo from "../Slices/fetchUserInfo"
// Tạo Redux store
export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        userproduct:userproductSlice,
        userInfo: informationUserSlice,
        getCartSlice: getCartSlice,
        cartItem:cartItemSlice,
        order: orderReducer,
        delivery: deliveryReducer,
        checkout: checkoutReducer,
        shipper: shipperReducer,
        shipperinfor: shipperInforReducer,
        shipperDelivery: shipperDelivery,
        adminUser: adminUser,
        adminProduct: adminProduct,
        otpReducer: otpReducer,
        PayhandleSlices: PayhandleSlices,
        paymentStatus:paymentStatusSlice,
        UpdateStatuspayment:UpdateStatuspayment,
        fetchUserInfo:fetchUserInfo
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;