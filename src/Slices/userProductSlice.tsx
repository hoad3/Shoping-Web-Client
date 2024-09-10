import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Redux/store';
import {UserProduct} from "../Types/TypeProduct";

interface ProductState {
    userproducts: UserProduct[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    userproducts: [],
    loading: false,
    error: null,
};

const userproductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsRequest: (state) => {
            state.loading = true;
            state.error = null;
            console.log('dang lay san pham')
        },
        fetchProductsSuccess: (state, action: PayloadAction<UserProduct[]>) => {
            state.userproducts = action.payload;
            state.loading = false;
            console.log('da lay san pham')
        },
        fetchProductsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            console.log('khong lay san pham')
        },
    },
});

export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } = userproductSlice.actions;

export default userproductSlice.reducer;
export const selectProducts = (state: RootState) => state.userproduct.userproducts;
export const selectProductsLoading = (state: RootState) => state.userproduct.loading;
export const selectProductsError = (state: RootState) => state.userproduct.error;
