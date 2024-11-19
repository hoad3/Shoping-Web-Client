import {addOrder, getdonhang} from "../Thunks/paymentThunks";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../Slices/authSlice";
import {enqueueSnackbar} from "notistack";
import HeaderComponent from "../homeConponent/headerComponent";


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
                trangthaithanhtoan: donmua.trangthaithanhtoan
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
                <div className='mt-28 w-full flex flex-col justify-center items-center'>
                    <h1 className="text-2xl font-bold mb-4 flex justify-center">Thông tin đơn khách tạo</h1>
                    <div className='w-11/12 border-t-2 mt-16 ml-10'>
                        {/* Header của bảng */}
                        <div className='flex border-b-2'>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Hình ảnh</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Người mua</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>ID sản phẩm</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Ngày đặt</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Đơn giá</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Số lượng</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Tên sản phẩm</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Tổng tiền</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Trạng thái thanh toán</div>
                            <div className='flex-1 font-bold border-r-2 justify-center items-center flex'>Phương thức thanh toán</div>
                            <div className='flex-1 font-bold justify-center items-center flex'>Hành động</div>
                        </div>
                        {/* Dữ liệu đơn hàng */}
                        {donmuaData.map((donmua) => (
                            <div key={donmua.iddonmua} className='flex border-b-2'>
                                <div className='flex-1 flex justify-center items-center border-r-2'>
                                    <img src={donmua.product.image} alt={donmua.product.name} className='h-40 w-40'/>
                                </div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>{donmua.nguoimua}</div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>{donmua.idproduct}</div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>{donmua.ngaydat}</div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>{donmua.dongia}</div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>{donmua.soluong}</div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>{donmua.name}</div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>{donmua.tongtien}</div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>
                                    {donmua.trangthaithanhtoan === 1 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                                </div>
                                <div className='flex-1 justify-center items-center flex border-r-2'>
                                    {donmua.phuongthucthanhtoan === 1 ? 'Thanh toán khi nhận hàng' : 'Thanh toán online'}
                                </div>
                                <div className='flex-1 justify-center items-center flex'>
                                    <button className='bg-green-400 h-8 flex justify-center items-center rounded-lg w-20' onClick={() => handlesubmit(donmua)}>Lên đơn</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );

    };

export default AddOrderForm;