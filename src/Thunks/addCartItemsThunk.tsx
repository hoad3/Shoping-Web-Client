import {createAsyncThunk} from "@reduxjs/toolkit";
import {data} from "autoprefixer";
// import axios from "axios/index";
// import {data} from "autoprefixer";
// import axios from "axios";


export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async ({ cartId, productId, quantity,cartItemId }: { cartId: number; productId: number; quantity:number; cartItemId: number }, { rejectWithValue }) => {
        console.log("Sending request with Cart ID:", cartId);
        console.log("Sending request with Product ID:", productId);

        try {

            const checkResponse = await fetch(`http://localhost:5295/CheckCartItem/${cartId}/${productId}`);
            const itemExists = await checkResponse.json();
            console.log("Item exists:", itemExists); // Gỡ lỗi
            if(itemExists == true)
            {
                const response = await fetch(`http://localhost:5295/AddCartItem/${cartId}/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cartItemId: 0, // Bạn có thể cần giữ cái này nếu server yêu cầu
                    }),
                });
                const data = await response.json();
                return data;
            }
            else {
                // Gửi yêu cầu để cập nhật số lượng sản phẩm
                const response = await fetch(`http://localhost:5295/UpdateCartItemQuantity/${cartId}/${productId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity }), // Gửi số lượng sản phẩm
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error('Failed to update cart item quantity');
                }

                const data = await response.json();
                return data;
            }


        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

