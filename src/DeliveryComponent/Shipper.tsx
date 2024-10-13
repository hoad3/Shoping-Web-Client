import React, {useEffect, useState} from "react";
import HeaderComponent from "../homeConponent/headerComponent";
import {useDispatch, useSelector} from "react-redux";
import ShipperInforComponent from "./ShipperInforComponent";


const ShipperComponent: React.FC = () => {


    // Lấy thông tin shipper từ store
    const shipper = useSelector((state) => state.shipper.shipper);
    const loading = useSelector((state) => state.shipper.loading);
    const error = useSelector((state) => state.shipper.error);

    // Lấy thông tin delivery từ store
    const { deliveryData, loading: deliveryLoading, error: deliveryError } = useSelector((state) => state.delivery);

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
                    <ShipperInforComponent/>
                </div>
            </div>
        </div>
    );
}

export default ShipperComponent;