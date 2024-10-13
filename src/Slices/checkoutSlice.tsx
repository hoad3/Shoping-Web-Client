import {createSlice} from "@reduxjs/toolkit";


interface CheckoutData {
    items: string[];        // Kiểu dữ liệu cho danh sách sản phẩm
    dongia: number[];       // Kiểu dữ liệu cho đơn giá
    soluong: number[];      // Kiểu dữ liệu cho số lượng
    sellerId: string[];     // Kiểu dữ liệu cho danh sách sellerId
    ProductId: string[];    // Kiểu dữ liệu cho danh sách productId
    name: string[];         // Tên sản phẩm
    image: string[];        // Ảnh sản phẩm
    tongtien: number;       // Tổng tiền
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        checkoutData: null,
    },
    reducers: {
        setCheckoutData: (state, action) => {
            state.checkoutData = action.payload;
        },
    },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;