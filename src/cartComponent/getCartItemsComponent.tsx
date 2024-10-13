import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCart, FetchCartsByUserId} from '../Thunks/getcartThunk';
import { selectUserId } from '../Slices/authSlice';
import {selectCartError, selectCartLoading} from "../Slices/getCartSlice";
import {selectCartItemIds, selectCartItems} from "../Slices/cartItemSlice";
import {deleteCartItem} from "../Thunks/deleteCartItemThunk";
import {enqueueSnackbar} from "notistack";
import HeaderComponent from "../homeConponent/headerComponent"
import {addCartItem} from "../Thunks/addCartItemsThunk";
// import {useNavigate} from "react-router-dom";
import {addDonhang} from "../Thunks/paymentThunks";
import {Console} from "inspector";
// import {updateCartItemQuantity} from "../Thunks/addCartItemsThunk";

const CartInfoComponent: React.FC = () => {
    // const navigate = useNavigate();
    // const [totalQuantity, setTotalQuantity] = useState(0);
    const dispatch = useDispatch();
    // const cartId = useSelector(selectCartId);
    const loading = useSelector(selectCartLoading);
    const error = useSelector(selectCartError);
    const userid = useSelector(selectUserId)
    const cartItem = useSelector(selectCartItems)
    const [selectedItems, setSelectedItems] = useState<number[]>([]); // Lưu trữ các sản phẩm được chọn
    const [totalPrice, setTotalPrice] = useState(0); // Tổng giá tiền
    const [paymentMethod, setPaymentMethod] = useState(1);
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

    const handleSelectItem = (itemId: number, itemValue: number, isChecked: boolean) => {
        let updatedSelectedItems = [...selectedItems];
        let newTotalPrice = totalPrice;
        if (isChecked) {
            updatedSelectedItems.push(itemId);
            const item = cartItem.find(item => item.cartItemId === itemId);
            newTotalPrice += itemValue * (item?.quantity ?? 0); // Cộng giá sản phẩm vào tổng
        } else {
            updatedSelectedItems = updatedSelectedItems.filter(id => id !== itemId);
            const item = cartItem.find(item => item.cartItemId === itemId);
            newTotalPrice -= itemValue * (item?.quantity ?? 0); // Trừ giá sản phẩm ra khỏi tổng
        }
        setSelectedItems(updatedSelectedItems);
        setTotalPrice(newTotalPrice);
    };

    const handleIncreaseQuantity = async (cartItemId: number) => {
        // Tìm sản phẩm trong giỏ hàng
        const item = cartItem.find(ci => ci.cartItemId === cartItemId);

        // Nếu sản phẩm tồn tại
        if (item) {
            // Gọi dispatch để cập nhật số lượng sản phẩm
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const resultAction = await dispatch(addCartItem({
                cartId: item.cartId,
                productId: item.productId,
                quantity: 1, // Tăng số lượng lên 1
                cartItemId
            }));

            if (addCartItem.fulfilled.match(resultAction)) {
                enqueueSnackbar('Đã tăng số lượng sản phẩm', { variant: 'success' });
                window.location.reload();
            }
        } else {
            enqueueSnackbar('Sản phẩm không tồn tại trong giỏ hàng', { variant: 'error' });
        }
    };

    const handleDecreaseQuantity = async (cartItemId: number) => {
        // Tìm sản phẩm trong giỏ hàng
        const item = cartItem.find(ci => ci.cartItemId === cartItemId);

        // Nếu sản phẩm tồn tại và số lượng lớn hơn 1
        if (item && item.quantity > 1) {
            // Gọi dispatch để cập nhật số lượng sản phẩm
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const resultAction = await dispatch(addCartItem({
                cartId: item.cartId,
                productId: item.productId,
                quantity: -1, // Giảm số lượng xuống 1
                cartItemId
            }));

            if (addCartItem.fulfilled.match(resultAction)) {
                enqueueSnackbar('Đã giảm số lượng sản phẩm', { variant: 'success' });
                window.location.reload();
            }
        } else {
            enqueueSnackbar('Không thể giảm thêm số lượng', { variant: 'error' });
        }
    };
    const handleCheckout = async () => {
        // Lọc các sản phẩm được chọn từ cartItem dựa trên selectedItems
        const selectedCartItems = cartItem.filter(item => selectedItems.includes(item.cartItemId));


        if (selectedCartItems.length === 0) {
            enqueueSnackbar('Vui lòng chọn ít nhất một sản phẩm để mua', { variant: 'warning' });
            return;
        }
        for(const item of selectedCartItems)
        {
            const formdata ={
                idnguoiban: item.product.sellerid || null, // Giả sử chỉ có một seller
                idnguoimua: userid || null, // Giả sử bạn có thông tin user hiện tại
                idproduct: item.productId || null, // Giả sử chỉ có một sản phẩm
                ngaydat: new Date().toISOString(),
                dongia: item.product.value, // Đơn giá của sản phẩm
                soluong: item.quantity, // Số lượng của sản phẩm
                name: item.product.name, // Tên sản phẩm
                tongtien: item.product.value * item.quantity, // Tổng tiền của đơn hàng
                phuongthucthanhtoan: paymentMethod,
            };
            // Gọi API để thêm đơn mua cho từng sản phẩm
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const resultAction = await dispatch(addDonhang(formdata));
                if (addDonhang.fulfilled.match(resultAction)) {
                    enqueueSnackbar(`Đã thêm đơn mua cho sản phẩm: ${item.product.name}`, { variant: 'success' });

                    await handleDeleteUserItem(item.cartItemId);
                } else {
                    enqueueSnackbar(`Lỗi khi thêm đơn mua cho sản phẩm: ${item.product.name}`, { variant: 'error' });
                }
            } catch (error) {
                enqueueSnackbar(`Có lỗi xảy ra khi tạo đơn mua cho sản phẩm: ${item.product.name}`, { variant: 'error' });
            }
        }


    };

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
            <div>
                <HeaderComponent/>
            </div>
            <div className='flex flex-col m-5'>
                <h1>Cart Items</h1>

                <ul  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl m-10'>
                    {cartItem.map(item => (
                        <li key={item.cartItemId} className='rounded-lg border-red-400 border-2 flex flex-col justify-center'>
                            <div className='flex flex-col items-center'>
                                <img src={item.product.image} alt={item.product.name} className='h-40 w-40 object-cover mb-4' />
                                <div className='w-full'>
                                    <h2>{item.product.name}</h2>
                                    <p>{item.product.decription}</p>
                                    {/*<p>id: {item.cartItemId}</p>*/}
                                    <p>Price: {item.product.value}</p>
                                    <p>Stock: {item.product.stockquantity}</p>
                                    {/*<p>SellerId: {item.product.sellerid}</p>*/}

                                </div>
                                <div className='flex flex-col'>
                                    {/* Hiển thị số lượng trong giỏ hàng */}
                                    <div className='m-2'>
                                        <p>Quantity in Cart: {item.quantity}</p>
                                    </div>
                                    <div>
                                        <button className='mr-10' onClick={() => handleIncreaseQuantity(item.cartItemId)}>Tăng</button>
                                        <button className='ml-10' onClick={() => handleDecreaseQuantity(item.cartItemId)}>Giảm</button>
                                    </div>

                                </div>
                            </div>
                            <div className='flex flex-row justify-center m-5'>
                                <button onClick={() => handleDeleteUserItem(item.cartItemId)}>Remove</button>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleSelectItem(item.cartItemId, item.product.value, e.target.checked)}
                                    className='ml-10'
                                />
                            </div>

                        </li>
                    ))}
                </ul>
                <div className='w-full h-16 backdrop-blur-sm bg-white/30 fixed bottom-0 z-50 flex items-center'>
                    <div className='mb-4'>
                        <label className='mr-2'>Phương thức thanh toán:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(Number(e.target.value))}
                            className='border p-2 rounded'
                        >
                            <option value={1}>Thanh toán khi nhận hàng</option>
                            <option value={2}>Thanh toán online</option>
                        </select>
                    </div>
                    <div className="ml-10">
                        <p>Total Price: {totalPrice} VND</p> {/* Hiển thị tổng giá tiền */}
                    </div>
                    <button onClick={handleCheckout} className='bg-green-400 rounded-lg w-32 h-14 transition-transform transition-rounded duration-300 transform hover:scale-105 hover:border-2 ml-40'>Mua hang</button>
                </div>
            </div>

        </div>
    );
};

export default CartInfoComponent;
