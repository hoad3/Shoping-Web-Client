
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import SearchBar from './SearchBar'; // Giả định bạn có component SearchBar
import { useCartContext } from "../Context/CartContext";
import { useUserContext } from "../Context/UserContext";

interface Product {
    id: number;
    name: string;
    value: number;
    image: string;
    description: string;
    stockQuantity: number;
    sellerId: number;
    dayCreated: string;
}

interface CartItem {
    cartItemId: number;
    cartId: number;
    productId: number;
    product: Product;
}

const Cart: React.FC = () => {
    const { cartId } = useCartContext();
    const { userId } = useUserContext();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:5295/Get_Item_Shoping/${cartId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);

                    // Tính tổng giá trị của sản phẩm
                    const total = data.reduce((sum: number, item: CartItem) => sum + item.product.value, 0);
                    setTotalValue(total);
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
                setCartItems(prevItems => {
                    const updatedItems = prevItems.filter(item => item.cartItemId !== cartItemId);

                    // Cập nhật tổng giá trị sau khi xóa sản phẩm
                    const total = updatedItems.reduce((sum, item) => sum + item.product.value, 0);
                    setTotalValue(total);

                    return updatedItems;
                });
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
            <header className='flex flex-row bg-gray-100 h-20 text-black justify-center w-full fixed top-0 z-50'>
                <div className='w-96 flex items-center justify-center text-4xl'>
                    <Link to="/">
                        <IoHomeOutline />
                    </Link>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <SearchBar />
                </div>
            </header>
            <div className='flex justify-center items-center flex-col h-screen mt-20'>
                {cartItems.map((item: CartItem) => (
                    <div key={item.cartItemId} className='flex flex-row m-5'>
                        <div>
                            <img src={item.product.image} alt={item.product.name} style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className='flex flex-col ml-14 w-80'>
                            <p>Product Name: {item.product.name}</p>
                            <p>Product Value: {item.product.value}</p>
                            <button className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif mt-1' onClick={() => handleDeleteItem(item.cartItemId)}>Xóa</button>
                        </div>
                    </div>
                ))}
                <div className='mt-5'>
                    <p className='text-2xl font-bold'>Tổng giá trị: {totalValue}</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
