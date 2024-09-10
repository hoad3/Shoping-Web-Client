import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const deleteCartItem  = createAsyncThunk(
    'cart/deleteCartItem',
            async (cartItemId: number,{ rejectWithValue }) =>{
                try{
                    const response = await axios.delete(`http://localhost:5295/Delete_Cart/${cartItemId}`)
                    console.log('da xoa:',response.data)
                    return response
                }
                catch (error) {
                    // Trả về lỗi nếu có vấn đề với request
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    return rejectWithValue(error.message());
                }
            }
)