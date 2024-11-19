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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const loading = useSelector((state) => state.shipper.loading);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const error = useSelector((state) => state.shipper.error);
    const deliveryData = useSelector(selectDeliveryData);
    const userId = useSelector(selectUserId);  // Ví dụ userId là 4

    useEffect(() => {
    // Gọi API lấy thông tin shipper khi component mount
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
    dispatch(fetchShipperByUserId(userId));
}, [dispatch, userId]);


    // Khi có idshipper, gọi API lấy thông tin delivery
    useEffect(() => {
        if (shipperId) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(fetchDeliveryByShipperID(shipperId));  // Gọi API lấy thông tin delivery
        }
    }, [dispatch, shipperId]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h1 className="text-xl font-semibold mb-4">Shipper Information</h1>
                    {shipper ? (
                        <div>
                            <p><strong>Shipper ID:</strong> {shipper.idshipper}</p>
                            <p><strong>Shipper Name:</strong> {shipper.shippername}</p>
                            <p><strong>Shipper Phone:</strong> {shipper.shipperphone}</p>
                            <p><strong>Status:</strong> {shipper.status}</p>
                        </div>
                    ) : (
                        <p>No shipper information available.</p>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                    {deliveryData && deliveryData.length > 0 ? (
                        deliveryData.map((delivery) => {
                            const { trangthaidonhang } = delivery.thanhtoan;
                            const isDisabled = {
                                button2: trangthaidonhang >= 2,
                                button3: trangthaidonhang >= 3,
                                button4: trangthaidonhang >= 4,
                                button5: trangthaidonhang >= 5,
                            };
                            return (
                                <div key={delivery.deliveryid} className="border-b border-gray-200 pb-4 mb-4">
                                    <div>
                                        <p><strong>Delivery ID:</strong> {delivery.deliveryid}</p>
                                        <p><strong>Pickup Time:</strong> {delivery.pickuptime}</p>
                                        <p><strong>Delivery Time:</strong> {delivery.deliverytime}</p>
                                        {delivery.deliverystatus === 2 &&(
                                            <p><strong>Delivery Status: Bàn giao cho shipper</strong></p>
                                        )}
                                        {delivery.deliverystatus === 3 &&(
                                            <p><strong>Delivery Status: Bàn giao cho shipper</strong></p>
                                        )}
                                        {delivery.deliverystatus === 4 &&(
                                            <p><strong>Delivery Status: Bàn giao cho shipper</strong></p>
                                        )}
                                        {delivery.deliverystatus === 5 &&(
                                            <p><strong>Delivery Status: Bàn giao cho shipper</strong></p>
                                        )}

                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            className={`bg-yellow-400 h-10 w-24 rounded-lg ${isDisabled.button2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 2)}
                                            disabled={isDisabled.button2}
                                        >
                                            Bàn giao
                                        </button>
                                        <button
                                            className={`bg-red-400 h-10 w-24 rounded-lg ${isDisabled.button3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 3)}
                                            disabled={isDisabled.button3}
                                        >
                                            Nhập kho
                                        </button>
                                        <button
                                            className={`bg-blue-400 h-10 w-24 rounded-lg ${isDisabled.button4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 4)}
                                            disabled={isDisabled.button4}
                                        >
                                            Đang giao
                                        </button>
                                        <button
                                            className={`bg-green-400 h-10 w-24 rounded-lg ${isDisabled.button5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleUpdateStatus(delivery.thanhtoan.id, 5)}
                                            disabled={isDisabled.button5}
                                        >
                                            Đã giao
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No deliveries found for this shipper.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShipperInforComponent;
