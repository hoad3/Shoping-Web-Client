import React, {useEffect, useRef, useState} from "react";
// import {Link, useNavigate} from "react-router-dom";
// import {FiShoppingCart, FiUser} from "react-icons/fi";
// import SearchBar from "../Component/SearchBar";
// import {IoHomeOutline} from "react-icons/io5";
// import {AiOutlineInbox} from "react-icons/ai";
import {RootState} from "../Redux/store";
import {useDispatch, useSelector} from "react-redux";
// import { IoMdArrowDropdown } from "react-icons/io";
// import {logout} from "../Slices/authSlice";
import ProductList from "../productComponent/ProductList";
import {FetchCartsByUserId} from "../Thunks/getcartThunk";
import HeaderComponent from "./headerComponent"


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

    return(
        <div>
            <div className='flex-col'>
                    <HeaderComponent/>
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