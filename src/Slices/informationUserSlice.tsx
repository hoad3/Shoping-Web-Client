import {UserInfo} from "../Types/TypeInfor";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../Redux/store";
import {addInfoUser, updateInfoUser} from "../Thunks/informationUserThunk";

interface InformationUserSliceState{
    userInfo: UserInfo |null;
    loading: boolean;
    error: string|null;

}

const initialState: InformationUserSliceState ={
    userInfo: null,
    loading: false,
    error: null,
}

const InformationUserSlice = createSlice({
    name:'userInfo',
    initialState,
    reducers:{
        fetchUserInfoRequest:(state) =>{
            state.loading = true;
            state.error = null;
            console.log('dang lay lay thong tin')
        },
        fetchUserInfoSuccess: (state, action:PayloadAction<UserInfo>) =>{
            state.userInfo = action.payload;
            state.loading = false;
            console.log('da lay thong tin')
        },
        fetchUserInfoFailure:(state, action:PayloadAction<string>) =>{
            state.error = action.payload;
            state.loading = false;
            console.log('chua lay lay thong tin')
        },

    },
    extraReducers: (builder) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        builder
            .addCase(addInfoUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('dang them thong tin')
            })
            .addCase(addInfoUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
                state.loading = false;
                state.userInfo = action.payload;
                console.log('da them thong tin')
            })
            .addCase(addInfoUser.rejected, (state, action) => {
                state.loading = false;
                console.log('chua them thong tin')
                state.error = typeof action.payload === 'string' ? action.payload : 'Có lỗi xảy ra.....';
            })
        // Handle pending state for updating user info
            .addCase(updateInfoUser.pending, (state) => {
            state.loading = true;
            state.error = null;
                console.log('dang update thong tin')
        })
            // Handle success case for updating user info
            .addCase(updateInfoUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
                state.loading = false;
                state.userInfo = action.payload;
                console.log('da update thong tin')
            })
            // Handle error case for updating user info
            .addCase(updateInfoUser.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Có lỗi xảy ra';
                console.log('chua update thong tin')
            });
    },

});

export const {fetchUserInfoRequest, fetchUserInfoSuccess, fetchUserInfoFailure} = InformationUserSlice.actions;
export default InformationUserSlice.reducer;
export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;
export const selectUserInfoLoading = (state: RootState) => state.userInfo.loading;
export const selectUserInfoError = (state: RootState) => state.userInfo.error;