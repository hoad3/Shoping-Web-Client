import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FiShoppingCart, FiUser} from "react-icons/fi";
import SearchBar from "../Component/SearchBar";
import {IoHomeOutline} from "react-icons/io5";
import {AiOutlineInbox} from "react-icons/ai";
import {RootState} from "../Redux/store";
import {useDispatch, useSelector} from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import {logout} from "../Slices/authSlice";
import ProductList from "../productComponent/ProductList";
import {FetchCartsByUserId} from "../Thunks/getcartThunk";
import ErrorNoCart from "../Error/errorNoCart";

// import {fetchCartItemsByCartId} from "../Thunks/cartItemThunk";


const Homepage: React.FC =() =>{
    const images = [
        'https://img.lazcdn.com/us/domino/3b4f6fd5838f7a5ba4886bf217afcb37.jpg_2200x2200q80.jpg',
        'https://img.lazcdn.com/us/domino/15467ddc189ae9d2f22f91f2fc5fa934.jpg_2200x2200q80.jpg',
        'https://img.lazcdn.com/us/domino/90d9707c702ff56bfad3470b4a8d7e29.jpg_2200x2200q80.jpg',
        'https://img.lazcdn.com/us/domino/3de5dc2ec759b4b72a5b47ad651f8d57.jpg_2200x2200q80.jpg',
    ];

    const { userid } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartId = useSelector((state: RootState) => state.getCartSlice.cartId);
    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('authToken');

        // Dispatch action logout
        dispatch(logout());

        // Chuyển hướng về trang chủ hoặc trang đăng nhập
        navigate('/');
    };
    const handleInfor =() =>{
        navigate('/userInfo');
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Gọi `FetchCartsByUserId` khi component được mount
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(FetchCartsByUserId({ userid }));
    }, [dispatch, userid]);


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


    console.log(userid)
    return(
        <div>
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
                       <div className='m-5'>
                            <Link to="/cartItem">
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <FiShoppingCart className='flex justify-center items-center' size='30' />

                            </Link>
                        </div>

                        <div className='m-5'>
                                <Link to='/UserProduct'>
                                    <AiOutlineInbox
                                        className='flex justify-center items-center' size='30'
                                    />
                                </Link>
                        </div>
                        <div className="w-80 h-auto flex justify-center items-center">

                            {userid ? (
                                // Show the user icon if logged in
                                <div>
                                    <FiUser className="text-black dropdown" size="30"/>
                                    <div className="dropdown">
                                        <input type="checkbox" id="dropdown-toggle"/>
                                        <label className="dropbtn" htmlFor="dropdown-toggle"><IoMdArrowDropdown /></label>

                                        <div className="dropdown-content flex flex-row">
                                            <a><button onClick={handleLogout}>Đăng xuất</button></a>
                                            <a><button onClick={handleInfor}>Thông tin người dùng</button></a>
                                            <a><button>d</button></a>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                // Show the login/register buttons if not logged in
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
            </div>
            <div className='w-full bg-gray-200 text-black'>
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
            <div>
                <ProductList/>
            </div>

        </div>
    )
}

export default Homepage;