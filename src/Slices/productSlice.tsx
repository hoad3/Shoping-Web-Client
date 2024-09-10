import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts,PRODUCTS_LIMIT } from '../Thunks/productThunk';
import {addProduct} from "../Thunks/addProductThunk";

export interface Product {
    id: number;
    name: string;
    value: number;
    image: string;
    description: string;
    stockquantity: number;
    sellerid: number;
    daycreated: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasMore: boolean;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.products = [];
            state.currentPage = 0;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                console.log('Fetching products...');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                console.log('Products fetched:', action.payload);
                state.loading = false;
                if (action.payload.length > 0) {
                    state.products = [...state.products, ...action.payload];
                    state.currentPage += 1;
                    state.hasMore = action.payload.length === PRODUCTS_LIMIT;
                } else {
                    state.hasMore = false;
                }
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<unknown>) => {
                console.log('Fetch products failed:', action.payload);
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Có lỗi xảy ra';
            })
        // // Xử lý khi đang thêm sản phẩm
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;

