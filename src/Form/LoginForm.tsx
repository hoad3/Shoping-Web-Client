// LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../Context/AuthContext";
import {useUserContext} from "../Context/UserContext";

const LoginForm: React.FC = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useAuthContext();
    const { setUserId } = useUserContext();
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Account:', account);
        console.log('Password:', password);

        try {
            const response = await axios.post('http://localhost:5295/login', {
                account,
                password,
            });

            const token = response.data.token;
            const userId = response.data.userid;
            console.log('Response:', response.data);
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            console.log('dang nhap thanh cong ');
            console.log('User ID:', userId);

            if (token) {
                setUserId(userId);
                setIsLoggedIn(true);
                console.log('Set userId:', userId);
                navigate('/');
            }
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            console.log('Đăng nhập không thành công');
        }
    };

    return (
        <div className="h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="w-auto h-auto bg-gray-200 flex flex-col items-center justify-center rounded-lg shadow-lg shadow-gray-600">
                <h2 className="mb-4 mt-10 font-semibold text-2xl text-gray-800">Đăng nhập</h2>
                <form onSubmit={handleLogin} className='m-5 flex justify-center items-center flex-col'>
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
                        <button className="m-4 bg-blue-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300" onClick={handleLogin}>
                            <Link to='/'>Đăng nhập</Link>
                        </button>
                        <button className='m-4 bg-blue-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300'>
                            <Link to='/Register' className='text-white'>Đăng ký</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
