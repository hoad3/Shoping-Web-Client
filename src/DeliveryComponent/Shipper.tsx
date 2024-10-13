import React, {useEffect, useState} from "react";
import HeaderComponent from "../homeConponent/headerComponent";
import {useDispatch, useSelector} from "react-redux";
import {fetchDeliveryData, fetchShipperInfo} from "../Thunks/DeliveryThunk";
import {RootState} from "../Redux/store";
import {selectUserId} from "../Slices/authSlice";


const ShipperComponent: React.FC = () => {
    const [thanhtoanData, setthanhtoanData] = useState(null);
    const dispatch = useDispatch();
    const userid = useSelector(selectUserId);

    // Lấy thông tin shipper từ store
    const shipper = useSelector((state) => state.shipper.shipper);
    const loading = useSelector((state) => state.shipper.loading);
    const error = useSelector((state) => state.shipper.error);

    // Lấy thông tin delivery từ store
    const { deliveryData, loading: deliveryLoading, error: deliveryError } = useSelector((state) => state.delivery);

    // Fetch thông tin shipper khi có userid
    useEffect(() => {
        if (userid) {
            
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(fetchShipperInfo(userid));
        }
    }, [dispatch, userid]);

    // Gọi fetchDeliveryData với idshipper khi có thông tin shipper
    useEffect(() => {
        if (shipper && shipper.idshipper) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(fetchDeliveryData(shipper.idshipper));
            console.log('Shipper info:', shipper);
        }
    }, [dispatch, shipper]);

    // Kiểm tra trạng thái loading và error
    if (loading) return <p>Loading shipper info...</p>;
    if (error) return <p>Error: {error}</p>;

    // Kiểm tra nếu deliveryData là undefined hoặc null
    if (!deliveryData) {
        return <p>No delivery data available.</p>;
    }
    if (deliveryLoading) return <p>Loading delivery data...</p>;
    if (deliveryError) return <p>Error: {deliveryError}</p>;

    return (
        <div>
            <div className='flex flex-col'>
                <div>
                    <HeaderComponent />
                </div>
                <div className='mt-28'>
                    <h2>Thông tin giao hàng</h2>
                    <p>Số lượng: {deliveryData.soluong}</p>
                    <p>Đơn giá: {deliveryData.dongia}</p>
                    <p>Tổng tiền: {deliveryData.tongtien}</p>
                    <p>Ngày thanh toán: {new Date(deliveryData.ngaythanhtoan).toLocaleDateString()}</p>
                    <p>Trạng thái đơn hàng: {deliveryData.trangthaidonhang}</p>
                    <p>Người mua: {deliveryData.nguoimua}</p>
                    <p>Người bán: {deliveryData.nguoiban}</p>
                </div>
            </div>
        </div>
    );
}

export default ShipperComponent;