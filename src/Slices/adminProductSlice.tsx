import {createSlice} from "@reduxjs/toolkit";
import {fetchAdminProduct, searchAdminProduct} from "../Thunks/adminThunk";


interface AdminProduct{
    id: number;
    name: string;
    value: number;
    image: string;
    decription: string;
    stockquantity: number;
    sellerid: number;
    daycreated: string
}

interface AdminProductState{
    adminProduct: AdminProduct[],
    loading: boolean,
    error: string | null
}

const initialState: AdminProductState = {
    adminProduct: [],
    loading: false,
    error: null,
};


const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.adminProduct = action.payload;
            })
            .addCase(fetchAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(searchAdminProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.adminProduct = action.payload; // Cập nhật danh sách sản phẩm với kết quả tìm kiếm
            })
            .addCase(searchAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default adminProductSlice.reducer