import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../Redux/store";
import {createCart} from "../Thunks/getcartThunk";


interface CartState{
    cartId: number|null;
    userid:number|null;
    createdAt:string|null;
    loading: boolean;
    error: string|null;
}

const initialState:CartState = {
    cartId: null,
    userid: null,
    createdAt: null,
    loading: false,
    error: null
}

const getCartSlice = createSlice(
    {
        name:'cart',
        initialState,
        reducers:{
            fetchCartRequest: (state) => {
                state.loading = true;
                state.error = null;
            },
            fetchCartSuccess: (state, action: PayloadAction<{ cartId: number; userid: number; createdAt: string }>) => {
                state.cartId = action.payload.cartId;
                state.userid = action.payload.userid;
                state.createdAt = action.payload.createdAt;
                state.loading = false;
            },
            fetchCartFailure: (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(createCart.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(createCart.fulfilled, (state, action: PayloadAction<{ cartId: number; userid: number; createdAt: string }>) => {
                    state.loading = false;
                    state.cartId = action.payload.cartId;
                    state.userid = action.payload.cartId;
                    state.createdAt = action.payload.createdAt;
                    state.error = null;
                    console.log('da tao cart')
                })
                .addCase(createCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                    console.log('chua tao cart')
                });
        },
    }
)

export const { fetchCartRequest, fetchCartSuccess, fetchCartFailure } = getCartSlice.actions;

export default getCartSlice.reducer;

// Selector để lấy dữ liệu từ state
export const selectCartId = (state: RootState) => state.getCartSlice.cartId;
export const selectCartLoading = (state: RootState) => state.getCartSlice.loading;
export const selectCartError = (state: RootState) => state.getCartSlice.error;
export const selectCartCreatedAt = (state: RootState) => state.getCartSlice.createdAt;