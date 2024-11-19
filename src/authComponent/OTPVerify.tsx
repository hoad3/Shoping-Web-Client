import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {verifyOtp} from "../Thunks/OTP";


const OTPVerify = () =>{

    // const location = useLocation();
    // const { email } = location.state; // Nhận email từ state
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { loading, success, error } = useSelector((state) => state.otpReducer)
    // Lấy email từ localStorage
    const email = localStorage.getItem('email');
    if(email != null)
    {
        console.log('email la:', email)
    }
    else
    {
        console.log('khong co email')
    }
    const handleVerifyOtp = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(verifyOtp({ email, otp }));
    };

    // Kiểm tra nếu email không tồn tại
    if (!email) {
        return <p>Error: Email is required to verify OTP.</p>;
    }

    return (
        <div>
            <h2>Verify OTP</h2>
            <p>Email: {email}</p>
            <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp} disabled={loading}>
                Verify OTP
            </button>
            {loading && <p>Verifying OTP...</p>}
            {success && <p>OTP verified successfully!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default OTPVerify