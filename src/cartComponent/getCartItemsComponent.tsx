import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCart, FetchCartsByUserId} from '../Thunks/getcartThunk';
import { selectUserId } from '../Slices/authSlice';
import {selectCartError, selectCartLoading} from "../Slices/getCartSlice";
import { selectCartItems} from "../Slices/cartItemSlice";
import {deleteCartItem} from "../Thunks/deleteCartItemThunk";
import {enqueueSnackbar} from "notistack";
import HeaderComponent from "../homeConponent/headerComponent"
import {addCartItem} from "../Thunks/addCartItemsThunk";
// import {useNavigate} from "react-router-dom";
import {addDonhang} from "../Thunks/paymentThunks";
import {selectUserInfo} from "../Slices/informationUserSlice";
import {createPayment} from "../Thunks/PayhandleThunk";
import {Invoice} from "../Thunks/PayhandleThunk"
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
    const [ totalPrice, setTotalPrice] = useState(0); // Tổng giá tiền
    const [paymentMethod, setPaymentMethod] = useState(1);
    const userDetails = useSelector(selectUserInfo);


    useEffect(() => {

        // Gọi `FetchCartsByUserId` khi component được mount
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(FetchCartsByUserId({ userid }));
    }, [dispatch, userid]);
    const handleDeleteUserItem = async (cartItemId: number) => {
        if(cartItemId!== null)
        {
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
        const selectedCartItems = cartItem.filter(item => selectedItems.includes(item.cartItemId));

        if (selectedCartItems.length === 0) {
            enqueueSnackbar('Vui lòng chọn ít nhất một sản phẩm để mua', { variant: 'warning' });
            return;
        }
        const generateRandomInvoiceId = () => {
            return Math.floor(Math.random() * 1000000); // Ví dụ: tạo một số ngẫu nhiên trong khoảng 0 - 999999
        };

        // Dữ liệu thanh toán
        const invoiceData: Invoice = {
            invoiceId: generateRandomInvoiceId(), // Nếu có thể, hoặc bạn có thể lấy từ API
            memberId: userDetails?.user_id?? 0, // id người dùng
            invoiceDate: new Date().toISOString(), // Ngày hiện tại
            givenName: userDetails?.username?? '', // Tên người dùng
            surname: userDetails?.username?? '', // Họ người dùng, nếu có
            phone: userDetails?.phone?? 0, // Số điện thoại người dùng
            address: userDetails?.address?? '', // Địa chỉ người dùng
            amount: totalPrice?? 0, // Tổng tiền
            invoiceDetails: selectedCartItems.map(item => ({
                invoiceId: generateRandomInvoiceId(), // Nếu có thể, hoặc bạn có thể lấy từ API
                productId: item.productId,
                price: item.product.value,
                quantity: item.quantity,
            })),
        };

        console.log('Thong tin thanh toan:',invoiceData)

        // Gọi API để tạo đơn hàng và gửi dữ liệu thanh toán
        for (const item of selectedCartItems) {
            const formdata = {
                idnguoiban: item.product.sellerid || null,
                idnguoimua: userid || null,
                idproduct: item.productId || null,
                ngaydat: new Date().toISOString(),
                dongia: item.product.value,
                soluong: item.quantity,
                name: item.product.name,
                tongtien: item.product.value * item.quantity,
                phuongthucthanhtoan: paymentMethod,
            };

            try {
                // Gọi API để thêm đơn mua cho từng sản phẩm
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const resultAction = await dispatch(addDonhang(formdata));
                if (addDonhang.fulfilled.match(resultAction)) {
                    enqueueSnackbar(`Đã thêm đơn mua cho sản phẩm: ${item.product.name}`, { variant: 'success' });

                    // Gọi API thanh toán nếu chọn phương thức thanh toán online
                    if (paymentMethod === 2) {
                        // Gọi thunk createPayment với dữ liệu thanh toán
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        const paymentResult = await dispatch(createPayment(invoiceData));
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        if (createPayment.fulfilled.match(paymentResult)) {
                            const paymentUrl = paymentResult.payload; // Lấy URL thanh toán từ payload
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            window.location.href = paymentUrl; // Chuyển hướng tới trang thanh toán
                        } else {
                            enqueueSnackbar('Lỗi khi tạo thanh toán', { variant: 'error' });
                        }
                    }

                    await handleDeleteUserItem(item.cartItemId);
                } else {
                    enqueueSnackbar(`Lỗi khi thêm đơn mua cho sản phẩm: ${item.product.name}`, { variant: 'error' });
                }
            } catch (error) {
                enqueueSnackbar(`Có lỗi xảy ra khi tạo đơn mua cho sản phẩm: ${item.product.name}`, { variant: 'error' });
            }
        }

        // Thông báo cho người dùng về tình trạng thành công
        if (paymentMethod === 1) { // Nếu là thanh toán khi nhận hàng
            enqueueSnackbar('Đã tạo đơn hàng thành công, vui lòng thanh toán khi nhận hàng!', { variant: 'success' });
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
                <h1 className='text-2xl font-bold mb-4'>Cart Items</h1>

                <div className='overflow-x-auto'>
                    <div className='min-w-full border border-gray-300'>
                        {/* Header */}
                        <div className='grid grid-cols-5 bg-gray-100 text-gray-600 font-semibold p-4'>
                            <div className='flex justify-center'>Image</div>
                            <div className='flex justify-center'>Product Name</div>
                            <div className='flex justify-center'>Price</div>
                            <div className='flex justify-center'>Stock</div>
                            <div className='flex justify-center'>Actions</div>
                        </div>

                        {/* Body */}
                        {cartItem.map(item => (
                            <div key={item.cartItemId} className='grid grid-cols-5 border-b border-gray-200 p-4'>
                                <div className='flex justify-center'>
                                    <img src={item.product.image} alt={item.product.name} className='h-20 w-20 object-cover' />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <span>{item.product.name}</span>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <span>{item.product.value}</span>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <span>{item.quantity}</span>
                                </div>
                                <div className='flex justify-center items-center space-x-2'>
                                    <button className='bg-blue-500 text-white py-1 px-2 rounded' onClick={() => handleIncreaseQuantity(item.cartItemId)}>Tăng</button>
                                    <button className='bg-blue-500 text-white py-1 px-2 rounded' onClick={() => handleDecreaseQuantity(item.cartItemId)}>Giảm</button>
                                    <button className='bg-red-500 text-white py-1 px-2 rounded' onClick={() => handleDeleteUserItem(item.cartItemId)}>Remove</button>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleSelectItem(item.cartItemId, item.product.value, e.target.checked)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-16 backdrop-blur-sm bg-white/30 fixed bottom-0 z-50 flex items-center'>
                    <div className='mb-4'>
                        <label className='mr-2'>Phương thức thanh toán:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => {
                                const selectedMethod = Number(e.target.value);
                                console.log("Phương thức thanh toán đã chọn:", selectedMethod);
                                setPaymentMethod(selectedMethod);
                            }}
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
