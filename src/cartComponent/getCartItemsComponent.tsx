import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCart, FetchCartsByUserId} from '../Thunks/getcartThunk';
import { selectUserId } from '../Slices/authSlice';
import {selectCartError, selectCartLoading} from "../Slices/getCartSlice";
import {selectCartItemIds, selectCartItems} from "../Slices/cartItemSlice";
import {deleteCartItem} from "../Thunks/deleteCartItemThunk";
import {enqueueSnackbar} from "notistack";


const CartInfoComponent: React.FC = () => {
    const dispatch = useDispatch();
    // const cartId = useSelector(selectCartId);
    const loading = useSelector(selectCartLoading);
    const error = useSelector(selectCartError);
    const userid = useSelector(selectUserId)
    const cartItem = useSelector(selectCartItems)
    // Giả sử `userid` là id của người dùng hiện tại

    useEffect(() => {

        // Gọi `FetchCartsByUserId` khi component được mount
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(FetchCartsByUserId({ userid }));
    }, [dispatch, userid]);
    const handleDeleteUserItem = async (cartItemId: number) => {
        if(cartItemId!== null)
        {
            // console.log("Cart ID:", cartItemId); // Debugging line
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
           const resultAction = await dispatch(deleteCartItem(cartItemId));
            // Nếu thêm sản phẩm thành công, reload trang
            if (deleteCartItem.fulfilled.match(resultAction)) {
                window.location.reload(); // Tải lại trang
            }
        }

    };
    const handleCreatCart = async (userid:number) =>{
        const currentDateTime = new Date().toISOString();  // Lấy thời gian hiện tại theo định dạng ISO 8601
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const resultAction = dispatch(createCart({userid, createdAt: currentDateTime}))
        // Nếu thêm sản phẩm thành công, reload trang
        if (createCart.fulfilled.match(resultAction)) {
            window.location.reload(); // Tải lại trang
        }
        enqueueSnackbar('Tạo giỏ hàng thành công!',{variant:'success'})
    }

    if (loading) return <div>Loading...</div>;
    if (error) {
        return (
            <div>
                <p>Chưa có giỏ hàng ấn vào nút phía dưới để tạo</p>
                {userid && (
                    <button onClick={() => handleCreatCart(userid)}>
                        Create Cart
                    </button>
                )}
            </div>
        );
    }
    console.log(cartItem)

    return (
        <div>
            <h1>Cart Items</h1>
            <ul>
                {cartItem.map(item => (
                    <li key={item.cartItemId}>
                        <img src={item.product.image} alt={item.product.name} />
                        <h2>{item.product.name}</h2>
                        <p>{item.product.description}</p>
                        <p>id: {item.cartItemId}</p>
                        <p>Price: {item.product.value}</p>
                        <p>Stock: {item.product.stockquantity}</p>
                        <button onClick={() => handleDeleteUserItem(item.cartItemId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartInfoComponent;
