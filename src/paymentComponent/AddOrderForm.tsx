import {addOrder, getdonhang, OrderStatus} from "../Thunks/paymentThunks";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../Slices/authSlice";
import {enqueueSnackbar} from "notistack";
import HeaderComponent from "../homeConponent/headerComponent";
import {Find_Product} from "../Thunks/productThunk";

const AddOrderForm = () => {
    const dispatch = useDispatch();
    const [donmuaData, setDonmuaData] = useState(null);
    const userid = useSelector(selectUserId);


    // Giả sử `products` đã được lưu trong Redux store
        useEffect(() => {
            const fetchDonmua = async () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const resultAction = await dispatch(getdonhang());
                console.log('Dữ liệu trả về từ API:', resultAction.payload);
                if (getdonhang.fulfilled.match(resultAction)) {
                    setDonmuaData(resultAction.payload); // Save data to state
                } else {
                    console.error('Failed to fetch order data');
                }
            };

            fetchDonmua();
        }, [dispatch, userid]);



    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handlesubmit = async(donmua) => {

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const formData =({
                idnguoimua: donmua.idnguoimua,
                idnguoiban: donmua.idnguoiban, // Sử dụng giá trị đã xử lý
                productId: donmua.idproduct, // Sử dụng giá trị đã xử lý
                soluong: donmua.soluong,
                dongia: donmua.dongia,
                ngaythanhtoan: new Date().toISOString(),
                nguoimua: donmua.nguoimua,
                nguoiban: donmua.nguoiban,
            })

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const resultAction = await dispatch(addOrder(formData));

            if (addOrder.fulfilled.match(resultAction)) {
                enqueueSnackbar('Tạo đơn hàng thành công!', { variant: 'success' });

            }else{
                enqueueSnackbar('Không thể tạo đơn hàng kiểm tra lại!', { variant: 'error' });
            }
        }

    // Hàm để cập nhật trạng thái đơn hàng



    // Tìm sản phẩm dựa trên thanhtoan.idproduct

    if (!donmuaData) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div>
                <HeaderComponent/>
            </div>
            <div className='w-full flex justify-center'>

                <div className='mt-28 w-3/4 flex flex-col justify-center items-center'>
                    <h1>Thông tin đơn khách tạo</h1>
                    <div className='flex flex-row w-full h-auto border-t-2 mt-16 '>
                        <div>
                            {donmuaData.map((donmua) =>(
                                <div key={donmua.iddonmua} className='flex flex-row items-center'>
                                    <div className=' flex justify-center items-center'>
                                        <img src={donmua.product.image} alt={donmua.product.name} className='h-40 w-40'/>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div>người mua: {donmua.id}</div>
                                        <div>người mua: {donmua.nguoimua}</div>
                                        <div>Id sản phẩm: {donmua.idproduct}</div>
                                        <div>Ngày đặt: {donmua.ngaydat}</div>
                                        <div>Đơn giá: {donmua.dongia}</div>
                                        <div>Số lượng: {donmua.soluong}</div>
                                        <div>Tên sản phẩm: {donmua.name}</div>
                                        <div>Tổng tiền: {donmua.tongtien}</div>
                                        <div>Phương thức thanh toán: {donmua.phuongthucthanhtoan}</div>
                                    </div>
                                    <button className='bg-green-400 h-8 flex justify-center items-center rounded-lg ml-10 w-20' onClick={() =>handlesubmit(donmua)}>Lên đơn</button>

                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>


    );

    };

export default AddOrderForm;