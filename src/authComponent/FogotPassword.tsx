import {useDispatch, useSelector} from "react-redux";

import {sendOtp, verifyOtp} from "../Thunks/OTP";
import {AppDispatch,RootState} from "../Redux/store";
import {useState} from "react";
import {Link} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import {changePassword} from "../Thunks/authThunk";




const FogotPassword = () =>{
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(''); // State để lưu OTP
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.otpReducer);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const handleSendOtp = () => {
        dispatch(sendOtp({ recipientEmail: email }))
            .then(() => {
                localStorage.setItem('email', email); // Lưu email vào localStorage
                setOtpSent(true); // Đánh dấu OTP đã được gửi
                console.log('email', email)
            })
            .catch((error) => {
                console.error("Failed to send OTP:", error);
            });

    };
    // const handleVerifyOtp = () => {
    //     // Lấy email từ localStorage
    //     const storedEmail = localStorage.getItem('email');
    //     if (storedEmail) {
    //         dispatch(verifyOtp({ email: storedEmail, otp }));
    //         console.log('otp', otp)
    //     } else {
    //         console.error("Email not found in localStorage.");
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(changePassword(email, newPassword));
    };

    const handleVerifyOtp = () => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            dispatch(verifyOtp({ email: storedEmail, otp }))
                .then(() => {
                    setOtpVerified(true); // Đánh dấu OTP đã được xác thực thành công
                })
                .catch((error) => {
                    console.error("Failed to verify OTP:", error);
                });
        } else {
            console.error("Email not found in localStorage.");
        }
    };



    return (

        <div className='w-full flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-96'>
                <CSSTransition
                    in={!otpSent}
                    timeout={300}
                    classNames="slide"
                    unmountOnExit
                >
                    <div>
                        <h2 className='text-lg font-semibold mb-4'>Nhập Email của bạn</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full mb-4"
                        />
                        <button onClick={handleSendOtp} disabled={loading} className="bg-blue-500 text-white p-2 rounded w-full">
                            Send OTP
                        </button>
                        {loading && <p>Vui lòng chờ trong giây lát...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={otpSent && !otpVerified}
                    timeout={300}
                    classNames="slide"
                    unmountOnExit
                >
                    <div>
                        <h2 className='text-lg font-semibold mb-4'>Xác nhận OTP</h2>
                        <p>Email: {localStorage.getItem('email')}</p>
                        <input
                            type="text"
                            placeholder="Enter your OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full mb-4"
                        />
                        <button onClick={handleVerifyOtp} disabled={loading} className="bg-blue-500 text-white p-2 rounded w-full">
                            Verify OTP
                        </button>
                        {loading && <p>Vui lòng chờ trong giây lát...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={otpVerified}
                    timeout={300}
                    classNames="slide"
                    unmountOnExit
                >
                    <div>
                        <p className="text-green-500">Xác thực OTP thành công!</p>
                        <h2 className="text-lg font-semibold">Đổi Mật Khẩu</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Mật Khẩu Mới:</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                            >
                                Đổi Mật Khẩu
                            </button>
                        </form>
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
};

export default FogotPassword;