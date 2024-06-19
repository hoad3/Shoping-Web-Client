import React, {useEffect, useRef, useState} from "react";
import axios from "axios/index";

import {Link} from "react-router-dom";
import {useUserContext} from "../Context/UserContext";

const images = [
    'https://i.pinimg.com/474x/76/f4/33/76f433b643b693bf8a96fcba3819054b.jpg',
    'https://i.pinimg.com/474x/26/c1/b1/26c1b17a4153fe337556928c3f0512bf.jpg',
    'https://i.pinimg.com/236x/4e/62/78/4e627880655e0f29e4c1cb428db6b089.jpg',
    'https://i.pinimg.com/474x/92/e7/dd/92e7dd6712c9d4ab812540f283bcdf3a.jpg',
];
const Test: React.FC = () => {
//     const [account, setAccount] = useState('');
//     const [password, setPassword] = useState('');
//     const { userId } = useUserContext(); // Đảm bảo đúng tên biến userId
//     const token = localStorage.getItem('authToken');
//     console.log('token',token)
//     useEffect(() => {
//         const authToken = localStorage.getItem('authToken');
//         const userId = localStorage.getItem('userId');
//         console.log('ID:', userId);
//         console.log('Context userId:', authToken);
//         console.log('Context userId:', userId);
//     }, [userId]);
//
//     const handleRegister = async (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log('Account:', account);
//         console.log('Password:', password);
//         await axios.post('http://localhost:5295/register', {
//             account,
//             password,
//         });
//     };
//
//     const handleLogin = async (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log('Account:', account);
//         console.log('Password:', password);
//
//         await axios.post('http://localhost:5295/login', {
//             account,
//             password,
//         });
//     };
//
//     const [isLogin, setIsLogin] = useState(true);
//     console.log('Set userId:', userId);
//     return (
//         <div>
//             <h1>User Profile</h1>
//             {userId ? (
//                 <p>User ID: {userId}</p>
//             ) : (
//                 <p>No user logged in</p>
//             )}
//         </div>
//     );
// };
//         <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
//             <div>
//                 <div>
//                     <div className="self-start hidden lg:flex flex-col  text-gray-700">
//
//                         <h1 className="my-3 font-semibold text-4xl mr-36">Welcome back</h1>
//                         <p className="pr-3 text-sm opacity-75"></p>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-auto h-auto bg-gray-100 flex justify-center items-center rounded-lg ">
//                 {isLogin ? (
//                     <form onSubmit={handleLogin}>
//                         <div className="flex justify-center items-center flex-col shadow-2xl border border-gray-300 rounded-3xl">
//                             <h2 className="mb-4 mt-10 font-semibold text-2xl text-gray-800">Login</h2>
//                             <div className="w-auto h-auto">
//                                 <input type="text" id="username" name="username" value={account} onChange={(e) => setUsername(e.target.value)}
//                                     className="m-5 w-96 h-14 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border border-gray-300"
//                                     placeholder="Nhập tên đăng nhập của bạn"
//                                 />
//                             </div>
//                             <div>
//                                 <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
//                                     className="m-5 w-96 h-14 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border border-gray-300"
//                                     placeholder="Nhập mật khẩu của bạn"
//                                 />
//                             </div>
//                             <div className="flex justify-center items-center">
//                                 <button className="m-4 mb-14 mt-10 border border-gray-300 hover:bg-green-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300" onClick={handleLogin}>
//                                     <Link to='/'>Đăng Nhập</Link>
//                                 </button>
//                                 <button
//                                     className="m-4 mb-14 mt-10 border border-gray-300 hover:bg-green-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                                     onClick={() => setIsLogin(false)}>
//                                     Đăng Ký
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 ) : (
//                     <div    >
//                         <form onSubmit={handleRegister}>
//                             <div className='flex justify-center items-center flex-col shadow-2xl border border-gray-300 rounded-3xl'>
//                                 <h2 className="mb-4 mt-10 font-semibold text-2xl text-gray-800 ">Sign Up</h2>
//                                 <div className="w-auto h-auto">
//                                     <input type="text"
//                                            id="account"
//                                            name="account"
//                                            value={account}
//                                            onChange={(e) => setUsername(e.target.value)}
//                                         className="m-5 w-96 h-14 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border border-gray-300"
//                                         placeholder="Nhập tên tài khoản"
//                                     />
//                                 </div>
//                                 <div className="w-auto h-auto">
//                                     <input type="password"
//                                            id="password"
//                                            name="password"
//                                            value={password}
//                                            onChange={(e) => setPassword(e.target.value)}
//                                         className="m-5 w-96 h-14 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border border-gray-300"
//                                         placeholder="Nhập mật khẩu"
//                                     />
//                                 </div>
//                                 <div>
//                                     <button
//                                         type="submit"
//                                         className="m-4 mb-14 mt-10 border border-gray-300 hover:bg-green-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
//                                         Đăng Ký
//                                     </button>
//                                     <button
//                                         className="m-4  mb-14 mt-10 border border-gray-300 hover:bg-green-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                                         onClick={() => setIsLogin(true)}>
//                                         Đăng Nhập
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
//
// }
// <div>
//     <label className="relative inline-flex items-center cursor-pointer">
//         <input type="checkbox" className="sr-only peer" value=""/>
//         <div className="w-96 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-20 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500">
//
//         </div>
//     </label>
// </div>
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            3000
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handlePrevClick = () => {
        resetTimeout();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        resetTimeout();
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="relative w-full max-w-2xl mx-auto">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((image, index) => (
                            <div key={index} className="min-w-full">
                                <img src={image} alt={`Slide ${index}`} className="w-full" />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handlePrevClick}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                    ‹
                </button>
                <button
                    onClick={handleNextClick}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                    ›
                </button>
            </div>
        </div>
    );

}

export default Test;