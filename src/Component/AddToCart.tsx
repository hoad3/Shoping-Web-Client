// import { useState } from 'react';
// import {useUserContext} from "../Context/UserContext";
// import {useCartContext} from "../Context/CartContext";
// interface AddToCartProps {
//     productId: number;
// }
//
// const AddToCart: React.FC<AddToCartProps> = ({ productId }) => {
//     const {cartId, setCartId} = useCartContext()
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');
//     const { userId } = useUserContext();
//     const addToCart = async () => {
//         setLoading(true);
//         setError('');
//         if(!userId)
//         {
//             alert("phai dang nhap vao he thong")
//             setLoading(false)
//             return;
//         }
//         try {
//             let currentCartId = cartId;
//
//             // Nếu không có giỏ hàng hiện tại, tạo giỏ hàng mới
//             if (!currentCartId) {
//                 const cartResponse = await fetch(`http://localhost:5295/AddCart`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         userId: userId, // lấy userId từ context
//                         createdAt: new Date().toISOString()
//                     })
//                 });
//
//                 if (!cartResponse.ok) {
//                     throw new Error('Failed to create cart');
//                 }
//
//                 const cartData = await cartResponse.json();
//                 currentCartId = cartData.cartId;
//                 if (currentCartId != null) {
//                     setCartId(currentCartId); // Cập nhật trạng thái có giỏ hàng ngay lập tức
//                 }
//
//             }
//
//             // Thêm hàng hóa vào giỏ hàng
//             const cartItemResponse = await fetch('http://localhost:5295/AddCartItem', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     cartId: currentCartId,
//                     productId: productId
//                 })
//             });
//
//             if (!cartItemResponse.ok) {
//                 throw new Error('Failed to add item to cart');
//             }
//
//             setLoading(false);
//         } catch (error) {
//             setError('There was an error adding the item to the cart.');
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div>
//             <button onClick={addToCart} disabled={loading}>Add to Cart</button>
//             {cartId && !loading && !error && <p></p>}
//             {error && <p>{error}</p>}
//         </div>
//     );
// };
// // Product added to cart successfully with cart ID: {cartId}
// export default AddToCart;