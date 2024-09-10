// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
//
// interface CartContextProps {
//     cartId: number | null;
//     setCartId: (cartId: number) => void;
// }
//
// const CartContext = createContext<CartContextProps | undefined>(undefined);
//
// export const CartProvider: React.FC<{ children: ReactNode, userId: number }> = ({ children, userId }) => {
//     const [cartId, setCartId] = useState<number | null>(null);
//
//     //cập nhật trạng thái giỏ hàng
//     useEffect(() => {
//         const fetchCartId = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5295/CartID/${userId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setCartId(data.cartId);
//                 } else {
//                     setCartId(null);
//                 }
//
//                 // console.log("thong tin",response)
//                 // console.log("id",cartId)
//             } catch (error) {
//                 console.error("Failed to fetch cart ID", error);
//                 setCartId(null);
//             }
//
//         };
//
//         fetchCartId();
//     }, [userId]);
//
//     return (
//         <CartContext.Provider value={{ cartId, setCartId }}>
//             {children}
//         </CartContext.Provider>
//     );
// };
//
// export const useCartContext = (): CartContextProps => {
//     const context = useContext(CartContext);
//     if (context === undefined) {
//         throw new Error('useCartContext must be used within a CartProvider');
//     }
//     return context;
// };
