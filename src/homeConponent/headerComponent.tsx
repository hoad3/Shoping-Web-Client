import React from "react";
// import {FetchCartsByUserId} from "../Thunks/getcartThunk";
import {logout} from "../Slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import {Link, useNavigate} from "react-router-dom";
import {IoHomeOutline} from "react-icons/io5";
import SearchBar from "../Component/SearchBar";
import {FiShoppingCart, FiUser} from "react-icons/fi";
import {IoMdArrowDropdown} from "react-icons/io";
import {LiaShippingFastSolid} from "react-icons/lia";
import {FaRegMoneyBillAlt, FaRegUser} from "react-icons/fa";
import {LuWarehouse} from "react-icons/lu";
import {PiWarehouseBold} from "react-icons/pi";
const headerComponent: React.FC =() =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { userid, role } = useSelector((state: RootState) => state.auth);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
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



    console.log('adasdasd', role)
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
                        <div className='m-5 flex flex-row items-center'>
                            {role === 1 && (
                                <>
                                    <div className="relative m-5">
                                        <FiShoppingCart size="30" />
                                        <div className="dropdown-cart absolute hidden">
                                            <div className="cart-item">
                                                <Link to='/cartItem'>Giỏ hàng</Link>
                                            </div>
                                            <div className="cart-item">
                                                <Link to='/Pay_List'>Lịch sử mua hàng</Link>
                                            </div>
                                            <div className="cart-item">Item 3</div>
                                        </div>
                                    </div>

                                    <div className='m-5'>
                                        <Link to='/UserProduct'>
                                            <LuWarehouse className='flex justify-center items-center' size='30' />
                                        </Link>
                                    </div>

                                    <div className='m-5 flex flex-row'>
                                        <FaRegMoneyBillAlt className='flex justify-center items-center' size='30' />
                                        <div className="dropdown">
                                            <input type="checkbox" id="dropdown-toggle" />
                                            <label className="dropbtn" htmlFor="dropdown-toggle">
                                                <IoMdArrowDropdown />
                                            </label>
                                            <div className="dropdown-content flex flex-row min-w-80">
                                                <a className='flex flex-col'>
                                                    <div className='flex justify-center items-center h-10 mt-3 border-b-2 border-gray-300 w-full'>
                                                        <Link to='/donmua'>Quản lý đơn hàng</Link>
                                                    </div>
                                                    <div className='flex justify-center items-center h-10 w-full'>
                                                        <Link to='/handleOrder'>Đơn hàng đang xử lý</Link>
                                                    </div>
                                                    <div className='flex justify-center items-center h-10 mb-3 border-t-2 border-gray-300 w-full'>
                                                        <Link to=''>Quản lý đơn hàng</Link>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {role === 2 && (
                                <div className='flex flex-row m-2'>
                                    <Link to='/adminProduct'>
                                        <PiWarehouseBold   className='flex justify-center items-center m-5' size='30' />
                                    </Link>
                                    <Link to='/adminUser'>
                                        <FaRegUser className='flex justify-center items-center m-5' size='30' />
                                    </Link>


                                </div>
                            )}

                            {role === 3 && (
                                <div className='m-2'>
                                    <Link to='/shipper'>
                                        <LiaShippingFastSolid className='flex justify-center items-center' size='30' />
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="w-80 h-auto flex justify-center items-center">

                            {userid ? (
                                // Show the user icon if logged in
                                <div className='flex flex-row '>
                                    <FiUser className="text-black dropdown border border-gray-400 rounded-full w-8 h-8" size="30"/>
                                    <div className="dropdown-user ">
                                        <input type="checkbox" id="dropdown-toggle-user"/>
                                        <label className="dropbtn-user" htmlFor="dropdown-toggle-user"><IoMdArrowDropdown /></label>

                                        <div className="dropdown-content-user flex flex-row">
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
        </div>
    )

}

export default headerComponent;