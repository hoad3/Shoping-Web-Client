import React, { useEffect, useState } from 'react';
import { useProductContext } from "../Context/ProductContext";
import { useCartContext } from "../Context/CartContext";
import { useUserContext } from "../Context/UserContext";
import {Link} from "react-router-dom";
import {IoHomeOutline} from "react-icons/io5";
import SearchBar from "./SearchBar";
import {FiShoppingCart, FiUser} from "react-icons/fi";
import {AiOutlineInbox} from "react-icons/ai";


interface CartItem {
    cartItemId: number;
    cartId: number;
    productId: number;
    // product: Product;
    // quantity: number; // nếu có thuộc tính này trong phản hồi từ API
}

const Cart: React.FC = () => {
    const { cartId } = useCartContext();
    const { userId } = useUserContext()
    const { products } = useProductContext()
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:5295/Get_Item_Shoping/${cartId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                    console.log("dasdasd",cartItems)
                } else {
                    console.error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }

        };
        fetchCartItems();
    }, [cartId]);

    const handleDeleteItem = async (cartItemId: number) => {
        try {
            const response = await fetch(`http://localhost:5295/Delete_Cart/${cartItemId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Xóa sản phẩm khỏi state nếu xóa thành công
                setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
            } else {
                console.error('Failed to delete cart item');
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };
    if (!cartItems.length) {
        return <div>Không có hàng hóa</div>;
    }

    return (
        <div>
            <div>
                <header className='flex flex-row bg-gray-100 h-20 text-black justify-center w-full fixed top-0 z-50'>
                    <div className='w-96 flex items-center justify-center text-4xl'>
                        <Link to="/">
                            <IoHomeOutline />
                        </Link>

                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <SearchBar />
                    </div>
                    {/*<div className='w-auto h-20 flex justify-center items-center'>*/}
                    {/*    {isLoggedIn &&(<div className='m-5'>*/}
                    {/*        <Link to="/Cart">*/}
                    {/*            <FiShoppingCart className='flex justify-center items-center' size='30' />*/}
                    {/*        </Link>*/}
                    {/*    </div>)}*/}

                    {/*    <div className='m-5'>*/}
                    {/*        {isLoggedIn&& (*/}
                    {/*            <Link to='/Product'>*/}
                    {/*                <AiOutlineInbox*/}
                    {/*                    className='flex justify-center items-center' size='30'*/}
                    {/*                />*/}
                    {/*            </Link>*/}
                    {/*        )}*/}

                    {/*    </div>*/}
                    {/*    <div className='w-80 h-20 flex justify-center items-center'>*/}
                    {/*        {isLoggedIn ? (*/}
                    {/*            <div className="relative flex justify-center items-center flex-col">*/}
                    {/*                <FiUser*/}
                    {/*                    size='30'*/}
                    {/*                    aria-labelledby="dropdownDefaultButton"*/}
                    {/*                    className="cursor-pointer mt-2"*/}
                    {/*                    onClick={handleToggleDropdown}*/}
                    {/*                />*/}
                    {/*                <p className=' ml-1 '>{formData.username}</p>*/}
                    {/*                {isDropdownOpen && (*/}
                    {/*                    <DropdownMenu onLogout={handleLogout} />*/}
                    {/*                )}*/}
                    {/*            </div>*/}


                    {/*        ) : (*/}
                    {/*            <>*/}
                    {/*                <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mr-2">*/}
                    {/*                    Đăng nhập*/}
                    {/*                </Link>*/}
                    {/*                <Link to="/register" className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">*/}
                    {/*                    Đăng ký*/}
                    {/*                </Link>*/}
                    {/*            </>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </header>
            </div>
            <div className='flex justify-center items-center flex-col h-screen'>
                {cartItems.map((item: any) => (
                    <div key={item.cartItemId} className='flex flex-row m-5'>
                        <div>
                            <img src={item.product.image} alt={item.product.name} style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className='flex flex-col ml-14 w-80'>
                            <p>Product Name: {item.product.name}</p>
                            <p>Product Value: {item.product.value}</p>
                            <button className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif mt-1' onClick={() => handleDeleteItem(item.cartItemId)}>Xóa</button>
                        </div>

                        {/* Hiển thị các thông tin khác của sản phẩm */}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
