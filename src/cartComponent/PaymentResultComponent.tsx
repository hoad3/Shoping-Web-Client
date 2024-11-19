// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import HeaderComponent from "../homeConponent/headerComponent";
import {useDispatch, useSelector} from "react-redux";
import {setPaymentResultPageActive} from "../Slices/paymentStatusSlice";
import {updateThanhtoanState} from "../Thunks/PayhandleThunk";
import {selectUserId} from "../Slices/authSlice";
import {RootState} from "../Redux/store";



interface PaymentResult {
    amount: number;
    bankCode: string;
    bankTranNo: string;
    cardType: string;
    orderInfo: string;
    payDate: string;
    responseCode: string;
    tmnCode: string;
    transactionNo: string;
    transactionStatus: string;
    txnRef: string;
    secureHash: string;
}

const PaymentResultPage = () => {
    const dispatch = useDispatch();
    const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
    const [error, setError] = useState(null);
    const userid = useSelector(selectUserId);
    const updateStatus = useSelector((state: RootState) => state.UpdateStatuspayment.updateStatus);
    useEffect(() => {
        // Lấy các tham số từ URL hiện tại
        dispatch(setPaymentResultPageActive(true))
        const params = new URLSearchParams(window.location.search);
        // Gọi API để lấy kết quả thanh toán
        const fetchPaymentResult = async () => {
            try {
                const response = await fetch(`http://localhost:5295/api/Payment/PaymentResult?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPaymentResult(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPaymentResult();

        return () => {
            dispatch(setPaymentResultPageActive(false));
        };
    }, [dispatch]);

    const handleClick = () => {
        const id = userid; // replace with the correct ID dynamically if needed
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(updateThanhtoanState(id));
    };

    if (!paymentResult) {
        return <div>Đang tải kết quả thanh toán...</div>;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const formatDateString = (dateString) => {
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        const hour = dateString.slice(8, 10);
        const minute = dateString.slice(10, 12);
        const second = dateString.slice(12, 14);

        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    };

    return (
        <div className="w-full flex flex-col">
            <HeaderComponent />
            <div className="mt-28 text-center border-2 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Kết quả thanh toán</h1>
                <p className="text-lg font-medium">Số tiền: {paymentResult.amount / 100}</p>
                <p className="text-lg font-medium">Mã giao dịch: {paymentResult.transactionNo}</p>
                <p className="text-lg font-medium">Ngày giao dịch: {formatDateString(paymentResult.payDate)}</p>
                <p className="text-lg font-medium">
                    Trạng thái giao dịch:
                    <span className={paymentResult.transactionStatus === "00" ? "text-green-600" : "text-red-600"}>
                {paymentResult.transactionStatus === "00" ? "Thành công" : "Thất bại"}
                    </span>
                </p>
                <div className="mt-6 mb-3">
                    <button
                        onClick={handleClick}
                        disabled={updateStatus === 'loading'}
                        className={`px-6 py-2 rounded-lg text-white font-semibold ${
                            updateStatus === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {updateStatus === 'loading' ? 'Updating...' : 'Xác nhận thanh toán.'}
                        {updateStatus === 'succeeded' && <p>Xác nhận thanh toán thành công!</p>}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PaymentResultPage;
