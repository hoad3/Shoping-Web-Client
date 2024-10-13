import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {HandleOrder, OrderStatus} from "../Thunks/paymentThunks";
import HeaderComponent from "../homeConponent/headerComponent";
import {enqueueSnackbar} from "notistack";
import addDeliveryAction from "../DeliveryComponent/Delivery";
import {fetchShippers} from "../Thunks/DeliveryThunk";
import {ShipperState} from "../Slices/DeliverySlices";


const HandleOrderConponent = () =>
{
    const dispatch = useDispatch();
    const [thanhtoanData, setthanhtoanData] = useState(null);
    // const userid = useSelector(selectUserId);
    const [idShipper, setIdShipper] = useState(0);
    const { shippers, status, error } = useSelector((state: { shipper: ShipperState }) => state.shipper);
    const [selectedShipperId, setSelectedShipperId] = useState(0);
    // Gọi fetchShippers để lấy danh sách shipper từ API
    useEffect(() => {
        if (status === 'idle') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(fetchShippers());
        }
    }, [status, dispatch]);
    useEffect(() => {
        const fetchDonmua = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const resultAction = await dispatch(HandleOrder());
                console.log('Dữ liệu trả về từ API:', resultAction.payload);

                if (HandleOrder.fulfilled.match(resultAction)) {
                    setthanhtoanData(resultAction.payload);
                } else {
                    console.error('Failed to fetch order data');
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };


        fetchDonmua();
    }, [dispatch]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleUpdateStatus = async (thanhtoan, status) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const resultAction = await dispatch(OrderStatus({ id: thanhtoan, trangthaidonhang: status }));

        if (OrderStatus.fulfilled.match(resultAction)) {
            enqueueSnackbar('Cập nhật trạng thái đơn hàng thành công!', { variant: 'success' });

            // Reload lại trang
            window.location.reload(); // Reload trang
        } else {
            enqueueSnackbar('Không thể cập nhật trạng thái đơn hàng!', { variant: 'error' });
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error

    const handleAddDelivery = async (thanhtoanid , idshipper, idnguoimua, idnguoiban) => {

        if(idshipper > 0)
        {
            await addDeliveryAction(dispatch, thanhtoanid, idshipper, idnguoimua, idnguoiban); // Truyền idshipper vào hàm
            //
            await handleUpdateStatus(thanhtoanid, 2);
        } else {
        alert('Vui lòng chọn shipper trước khi tạo delivery!');}
    };
    if(!thanhtoanData)
    {
        return (
            <div>Loading...</div>
        )
    }
    return(
        <div>
            <div>
                <div>
                    <HeaderComponent/>
                </div>
                <div className='w-full flex justify-center'>
                    <div className='mt-28 w-3/4 flex flex-col justify-center items-center'>
                        <h1>Xử lý đơn hàng</h1>
                        <div className='flex flex-row w-full '>
                            <div className='w-full h-auto'>
                                {thanhtoanData.map((thanhtoan) =>{
                                    const { trangthaidonhang } = thanhtoan;
                                    const disableButton1 = trangthaidonhang >= 1; // Vô hiệu hóa nút 1 nếu trạng thái >= 1
                                    const disableButton2 = trangthaidonhang >= 2; // Vô hiệu hóa nút 2 nếu trạng thái >= 2
                                    const disableButton3 = trangthaidonhang >= 3; // Vô hiệu hóa nút 3 nếu trạng thái >= 3
                                    const disableButton4 = trangthaidonhang >= 4; // Vô hiệu hóa nút 3 nếu trạng thái >= 3
                                    const disableButton5 = trangthaidonhang >= 5; // Vô hiệu hóa nút 3 nếu trạng thái >= 3
                                    return(
                                        <div key={thanhtoan.id} className='flex flex-row items-center w-full h-auto border-t-2 mt-16'>
                                            <div className=' flex justify-center items-center'>
                                                <img src={thanhtoan.product.image} alt={thanhtoan.product.name} className='h-40 w-40'/>
                                            </div>
                                            <div className='flex flex-col'>
                                                <div>người bán: {thanhtoan.nguoiban}</div>
                                                <div>ID thanh toán: {thanhtoan.id}</div>
                                                <div>người mua: {thanhtoan.nguoimua}</div>
                                                <div>Ngày đặt: {thanhtoan.ngaythanhtoan}</div>
                                                <div>Đơn giá: {thanhtoan.dongia}</div>
                                                <div>Số lượng: {thanhtoan.soluong}</div>
                                                <div>Tên sản phẩm: {thanhtoan.product.name}</div>
                                                <div>Tổng tiền: {thanhtoan.tongtien}</div>
                                                <div>Trạng thái đơn hàng: {thanhtoan.trangthaidonhang}</div>
                                            </div>
                                            <button
                                                className={`bg-blue-400 h-8 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={() => handleUpdateStatus(thanhtoan.id, 1)}
                                                disabled={disableButton1}
                                            >
                                                Đóng gói
                                            </button>
                                            <button
                                                className={`bg-yellow-400 h-20 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                // onClick={() => handleUpdateStatus(thanhtoan.id, 2)}
                                                disabled={disableButton2}
                                            >
                                                Bàn giao cho Shipper
                                            </button>
                                            <button
                                                className={`bg-red-400 h-8 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                // onClick={() => handleUpdateStatus(thanhtoan.id, 3)}
                                                disabled={disableButton3}
                                            >
                                               Nhập kho
                                            </button>
                                            <button
                                                className={`bg-red-400 h-8 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                // onClick={() => handleUpdateStatus(thanhtoan.id, 4)}
                                                disabled={disableButton4}
                                            >
                                                Đang giao
                                            </button>
                                            <button
                                                className={`bg-red-400 h-8 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                // onClick={() => handleUpdateStatus(thanhtoan.id, 5)}
                                                disabled={disableButton5}
                                            >
                                                Đã giao
                                            </button>

                                            {/* Dropdown chọn shipper */}
                                            <div className='ml-4'>
                                                {shippers.map((shipper) =>{
                                                    return(
                                                        // eslint-disable-next-line react/jsx-key
                                                        <div className='flex flex-row justify-center items-center border-l-2 w-80 ml-14'>
                                                            <label htmlFor='idShipperSelect'  className='mr-2'>Chọn Shipper: </label>
                                                            <select
                                                                value={selectedShipperId} // Gán giá trị cho dropdown
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);// In ra giá trị chọn
                                                                    setSelectedShipperId(value);
                                                                }}
                                                            >
                                                                        <option key={shipper.idshipper} value={shipper.idshipper}>
                                                                            {shipper.shippername}
                                                                        </option>
                                                            </select>
                                                            {status === 'failed' && <p>Error: {error}</p>}
                                                            <button
                                                                className='bg-green-400 h-8 flex justify-center items-center rounded-lg ml-2 w-32'
                                                                onClick={() => handleAddDelivery(thanhtoan.id, shipper.idshipper, thanhtoan.idnguoimua, thanhtoan.idnguoiban)}
                                                            >
                                                                Tạo Delivery
                                                            </button>
                                                        </div>

                                                    );
                                                })}

                                            </div>

                                            {/* Nút để tạo Delivery */}

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HandleOrderConponent;