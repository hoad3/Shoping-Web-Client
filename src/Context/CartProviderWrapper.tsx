import React from 'react';
import { useUserContext } from '../Context/UserContext';
import { CartProvider } from '../Context/CartContext';

const CartProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userId } = useUserContext();
    // console.log('userId in CartProviderWrapper:', userId);
    if (!userId) {
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <CartProvider userId={userId}>
            {children}
        </CartProvider>
    );
};

export default CartProviderWrapper;
