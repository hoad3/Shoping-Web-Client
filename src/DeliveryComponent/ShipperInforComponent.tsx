import {useDispatch, useSelector} from "react-redux";
import {selectShipper, selectShipperId} from "../Slices/shipperinfoSlice";
import {fetchShipperByUserId} from "../Thunks/DeliveryThunk";
import {useEffect} from "react";
import {selectUserId} from "../Slices/authSlice";
import {fetchDeliveryByShipperID, selectDeliveryData} from "../Slices/shipperDelivery";
import {OrderStatus} from "../Thunks/paymentThunks";
import {enqueueSnackbar} from "notistack";


const ShipperInforComponent = () => {
    const dispatch = useDispatch();
    const shipper = useSelector(selectShipper);  // Lấy thông tin shipper
    const shipperId = useSelector(selectShipperId);  // Lấy shipperId
    const loading = useSelector((state) => state.shipper.loading);
    const error = useSelector((state) => state.shipper.error);
    const deliveryData = useSelector(selectDeliveryData);
    const userId = useSelector(selectUserId);  // Ví dụ userId là 4

    useEffect(() => {
    // Gọi API lấy thông tin shipper khi component mount
    dispatch(fetchShipperByUserId(userId));
}, [dispatch, userId]);


    // Khi có idshipper, gọi API lấy thông tin delivery
    useEffect(() => {
        if (shipperId) {
            dispatch(fetchDeliveryByShipperID(shipperId));  // Gọi API lấy thông tin delivery
        }
    }, [dispatch, shipperId]);
    deliveryData.forEach((delivery) => {
        console.log('Delivery Data', delivery.thanhtoan.id);
    });

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

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

return (
    <div>
        <h1>Shipper Information</h1>
        {shipper && (
            <div>
                <p>Shipper ID: {shipper.idshipper}</p>
                <p>Shipper Name: {shipper.shippername}</p>
                <p>Shipper Phone: {shipper.shipperphone}</p>
                <p>Status: {shipper.status}</p>
            </div>
        )}

        <h2>Delivery Information</h2>
        {deliveryData.length > 0 ? (
            deliveryData.map((delivery) => {
                    const { trangthaidonhang } = delivery.thanhtoan;
                const disableButton2 = trangthaidonhang >= 2; // Vô hiệu hóa nút 2 nếu trạng thái >= 2
                const disableButton3 = trangthaidonhang >= 3; // Vô hiệu hóa nút 3 nếu trạng thái >= 3
                const disableButton4 = trangthaidonhang >= 4; // Vô hiệu hóa nút 3 nếu trạng thái >= 3
                const disableButton5 = trangthaidonhang >= 5; // Vô hiệu hóa nút 3 nếu trạng thái >= 3
                return(
                    <div key={delivery.deliveryid}>
                        <div>
                            <p>Delivery ID: {delivery.deliveryid}</p>
                            <p>Pickup Time: {delivery.pickuptime}</p>
                            <p>Delivery Time: {delivery.deliverytime}</p>
                            <p>Delivery Status: {delivery.deliverystatus}</p>
                            <p>Seller ID: {delivery.idnguoiban}</p>
                            <p>Buyer ID: {delivery.idnguoimua}</p>
                        </div>
                        <div>
                            <div>
                                <button
                                    className={`bg-yellow-400 h-20 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 2)}
                                    disabled={disableButton2}
                                >
                                    Bàn giao cho Shipper
                                </button>
                                <button
                                    className={`bg-red-400 h-8 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 3)}
                                    disabled={disableButton3}
                                >
                                    Nhập kho
                                </button>
                                <button
                                    className={`bg-red-400 h-8 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 4)}
                                    disabled={disableButton4}
                                >
                                    Đang giao
                                </button>
                                <button
                                    className={`bg-red-400 h-8 flex justify-center items-center rounded-lg ml-2 w-20 ${disableButton3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 5)}
                                    disabled={disableButton5}
                                >
                                    Đã giao
                                </button>
                            </div>
                        </div>
                    </div>

                )
            }

            )
        ) : (
            <p>No deliveries found for this shipper.</p>
        )}
    </div>
);
};

export default ShipperInforComponent;
