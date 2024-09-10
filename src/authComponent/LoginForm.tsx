// LoginForm.tsx
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../Redux/store'
import {login} from "../Thunks/authThunk";

const LoginForm: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, userid,token } = useSelector((state: RootState) => state.auth);

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(login({account,password}));

    };
    useEffect(() => {
        console.log('loading:', loading);
        if (userid && token) {
            // Nếu đăng nhập thành công, chuyển hướng đến trang Home
            navigate('/');
        }
    }, [userid, navigate]);



    return (
        <div className="h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="w-auto h-auto bg-gray-200 flex flex-col items-center justify-center rounded-lg shadow-lg shadow-gray-600">
                <h2 className="mb-4 mt-10 font-semibold text-2xl text-gray-800">Đăng nhập</h2>
                <form onSubmit={handleSubmit} className='m-5 flex justify-center items-center flex-col'>
                    <div className="w-auto h-auto">
                        <label htmlFor="username" className="text-black ml-5">Tài khoản</label>
                        <div className="mt-1">
                            <input type="text" id="username" name="username" value={account} onChange={(e) => setAccount(e.target.value)}
                                   className="m-5 w-96 h-14 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border border-gray-300" placeholder="Nhập tên đăng nhập của bạn" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-black ml-8">Mật khẩu</label>
                        <div className="">
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                   className="m-5 w-96 h-14 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border border-gray-300" placeholder="Nhập mật khẩu của bạn" />
                        </div>
                    </div>
                    <div className='flex-row'>
                        <button
                            type="submit"
                            className="m-4 bg-blue-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            disabled={loading}
                        >
                            Đăng nhập
                        </button>
                        <button className='m-4 bg-blue-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300'>
                            <Link to='/Register' className='text-white'>Đăng ký</Link>
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default LoginForm;
