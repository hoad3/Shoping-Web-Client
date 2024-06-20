

import React, {useState, useEffect, useRef} from 'react';
import { IoHomeOutline } from "react-icons/io5";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import SearchBar from "../Component/SearchBar";
// import AddToCart from "../Component/AddToCart";
import {useProductContext} from "../Context/ProductContext";
import {useAuthContext} from "../Context/AuthContext";
import { AiOutlineInbox } from "react-icons/ai";
import AddToCart from "../Component/AddToCart";
import {useUserContext} from "../Context/UserContext";
import InformationUser from "../UserForm/InformationUser";
interface InformationUser {
    idname: number;
    user_id: number;
    username: string;
    phone: number;
    email: string;
    address: string;
}
const images = [
    'https://img.lazcdn.com/us/domino/3b4f6fd5838f7a5ba4886bf217afcb37.jpg_2200x2200q80.jpg',
    'https://img.lazcdn.com/us/domino/15467ddc189ae9d2f22f91f2fc5fa934.jpg_2200x2200q80.jpg',
    'https://img.lazcdn.com/us/domino/90d9707c702ff56bfad3470b4a8d7e29.jpg_2200x2200q80.jpg',
    'https://img.lazcdn.com/us/domino/3de5dc2ec759b4b72a5b47ad651f8d57.jpg_2200x2200q80.jpg',
];
const Home: React.FC = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<InformationUser | null>(null);
    const { products, loading,handleLoadMore,fetchProducts   } = useProductContext();
    const { isLoggedIn, setIsLoggedIn, } = useAuthContext();
    const {userId} = useUserContext()
    const [formData, setFormData] = useState<InformationUser>({
        idname: 0,
        user_id: 0,
        username: '',
        phone: 0,
        email: '',
        address: ''
    });
    // console.log(products)
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
    const inforuser = async () =>{
        try{
            const infor = await axios.get(`http://localhost:5295/API/Find_Information_User/${userId}`)
            setFormData(infor.data)
        }catch (erro){

        }

    }
    useEffect(() => {
        if (userId !== null) {
            inforuser();
        }
    }, [userId]);
    const DropdownMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
        <div className="absolute right-10 mt-48 w-48 bg-white rounded-md shadow-xl z-10">
            <Link to='/Information_User' className='block px-4 py-2 text-sm text-gray-800 hover:bg-green-400 w-full text-left'>
                Thêm thông tin người dùng
            </Link>
            <Link to='/FindInformationUser' className='block px-4 py-2 text-sm text-gray-800 hover:bg-green-400 w-full text-left'>
                Thông tin người dùng
            </Link>
            <button
                onClick={onLogout}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-green-400 w-full text-left">
                Đăng xuất
            </button>
        </div>
    );
    //set logic cho nút đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        // console.log("da dang xuat ");
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className='h-screen bg-gray-200'>
            <div className='flex-col'>
                <header className='flex flex-row bg-gray-100 h-20 text-black justify-center w-full fixed top-0 z-50'>
                    <div className='w-96 flex items-center justify-center text-4xl'>
                        <Link to="/">
                            <IoHomeOutline />
                        </Link>

                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <SearchBar />
                    </div>
                    <div className='w-auto h-20 flex justify-center items-center'>
                        {isLoggedIn &&(<div className='m-5'>
                            <Link to="/Cart">
                                <FiShoppingCart className='flex justify-center items-center' size='30' />
                            </Link>
                        </div>)}

                        <div className='m-5'>
                            {isLoggedIn&& (
                                <Link to='/Product'>
                                    <AiOutlineInbox
                                        className='flex justify-center items-center' size='30'
                                    />
                                </Link>
                            )}

                        </div>
                        <div className='w-80 h-auto flex justify-center items-center'>
                            {isLoggedIn ? (
                                <div className=" flex justify-center items-center flex-col">
                                    <FiUser
                                        size='30'
                                        aria-labelledby="dropdownDefaultButton"
                                        className="cursor-pointer mt-2 "
                                        onClick={handleToggleDropdown}
                                    />
                                    <p className=' ml-1 '>{formData.username}</p>
                                    {isDropdownOpen && (
                                        <DropdownMenu onLogout={handleLogout} />
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mr-2">
                                        Đăng nhập
                                    </Link>
                                    <Link to="/register" className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">
                                        Đăng ký
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <div className='w-full bg-gray-200 text-black'>

                    <div className='w-auto flex justify-center items-center flex-col'>
                        <div className='w-1/7 h-auto mt-20'>
                            <div>
                                <div className='mt-10 flex justify-center items-center'>
                                    <div className="relative w-full max-w-[50rem] mx-auto flex justify-center items-center">
                                        <div className="overflow-hidden">
                                            <div
                                                className="flex transition-transform duration-500 ease-in-out"
                                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                            >
                                                {images.map((image, index) => (
                                                    <div key={index} className="min-w-full flex justify-center items-center">
                                                        <img src={image} alt={`Slide ${index}`} className="w-[45rem] h-80" />
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
                            </div>
                        </div>
                        <div className=''>
                            {products.length > 0 ? (
                                <ul className='w-auto max-w-4xl grid grid-cols-4 flex-row justify-center items-center mt-10 hover:border-red-400'>
                                    {products.map((product, index) => (
                                        <li key={index} className='m-14 w-44 h-44'>
                                                <div className=' '>
                                                    <Link to={`/product/${product.id}`}>
                                                        <div className='w-44 h-44 overflow-hidden flex items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-gray-500 hover:shadow-2xl hover:rounded-lg'>
                                                            <img src={product.image}  className='w-full h-full object-cover rounded-lg ' />
                                                        </div>
                                                    </Link>
                                                    <p className='w-36 '>{product.name}</p>
                                                    <p>{product.value}.đ</p>
                                                    <button className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif mt-1'>
                                                        {
                                                            userId && <AddToCart productId={product.id} />
                                                        }
                                                    </button>
                                                </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No products available.</p>
                            )}
                        </div>
                        </div>
                    {products.length > 0 && (
                        <div className='w-auto border-2 flex justify-center items-center mt-4 bg-gray-200'>
                            <button
                                onClick={handleLoadMore}
                                className='px-4 py-2 text-blue-700 rounded-lg w-80 h-14 bg-blue-300 m-10'
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Home;


