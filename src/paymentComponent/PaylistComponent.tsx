import { useDispatch, useSelector } from 'react-redux';
import {selectUserId} from "../Slices/authSlice";
import React, {useEffect, useState} from "react";
import {PaymentListNguoimua} from "../Thunks/paymentThunks";
import HeaderComponent from "../homeConponent/headerComponent";


const PaylistComponent = () =>{
    const dispatch = useDispatch()
    const userid = useSelector(selectUserId)
    const [donmuaData, setDonmuaData] = useState(null);


    useEffect(() => {
        // Gọi API và lưu kết quả vào state `donmuaData`
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(PaymentListNguoimua()).then((action) => {
            if (PaymentListNguoimua.fulfilled.match(action)) {
                setDonmuaData(action.payload);
            }
        });
    }, [dispatch, userid]);

    return(
        <div className='w-full flex'>
            <HeaderComponent/>
            <div className='w-full px-4 mt-28'>
                <div className='flex justify-center text-4xl font-bold mb-10'>Đơn hàng đã đặt</div>
                {/* Header row for table */}
                <div className='grid grid-cols-8 gap-4 font-bold border-b border-gray-300 py-2'>
                    <div className='flex justify-center'>Hình ảnh</div>
                    <div className='flex justify-center'>Người mua</div>
                    <div className='flex justify-center'>Id sản phẩm</div>
                    <div className='flex justify-center'>Ngày đặt</div>
                    <div className='flex justify-center'>Đơn giá</div>
                    <div className='flex justify-center'>Số lượng</div>
                    <div className='flex justify-center'>Tên sản phẩm</div>
                    <div className='flex justify-center'>Tổng tiền</div>
                </div>

                {/* Data rows */}
                {donmuaData && donmuaData.map((donmua) => (
                    <div
                        key={donmua.iddonmua}
                        className={`grid grid-cols-8 gap-4 py-2 border-b border-gray-200 items-center
                    ${donmua.trangthaithanhtoan === 1 ? 'bg-yellow-100' : 'bg-green-100'}`}
                    >
                        <div className='flex justify-center '>
                            <img src={donmua.product.image} alt={donmua.product.name} className='h-20 w-20 object-cover'/>
                        </div>
                        <div className='flex justify-center'>{donmua.nguoimua}</div>
                        <div className='flex justify-center'>{donmua.idproduct}</div>
                        <div className='flex justify-center'>{donmua.ngaydat}</div>
                        <div className='flex justify-center'>{donmua.dongia}</div>
                        <div className='flex justify-center'>{donmua.soluong}</div>
                        <div className='flex justify-center'>{donmua.name}</div>
                        <div className='flex justify-center'>{donmua.tongtien}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaylistComponent;