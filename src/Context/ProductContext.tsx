// // ProductContext.tsx
// import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
// import axios from 'axios';
// import {useUserContext} from "./UserContext";
//
// interface Product {
//     id: number;
//     name: string;
//     value: string;
//     image: string;
//     decription: string;
//     stockquantity: string;
//     sellerId: string;
//     dayCreated: string;
// }
//
// interface ProductContextProps {
//     products: Product[];
//     setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
//     currentPage: number;
//     setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//     productsPerPage: number;
//     setProductsPerPage: React.Dispatch<React.SetStateAction<number>>;
//     loading: boolean;
//     handleLoadMore: () => void;
//     fetchProductsBySellerId: (sellerId: number) => void;
// }
//
// const ProductContext = createContext<ProductContextProps | undefined>(undefined);
//
// export const useProductContext = () => {
//     const context = useContext(ProductContext);
//     if (!context) {
//         throw new Error('useProductContext must be used within a ProductProvider');
//     }
//     return context;
// };
// interface ProductProviderProps {
//     children: ReactNode;
// }
// export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage, setProductsPerPage] = useState(8);
//     const [loading, setLoading] = useState(false); //dặt trạng thái loading mặc định là false
//     const {userId} = useUserContext()
//     useEffect(() => {
//         const fetchProducts = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`http://localhost:5295/Get_All_Produc?page=${currentPage}&limit=${productsPerPage}`);
//                 const newProducts = response.data;
//
//                 setProducts(prevProducts => {
//                     const productMap = new Map<string, Product>();
//                     [...prevProducts, ...newProducts].forEach(product => {
//                         productMap.set(product.name, product);
//                     });
//                     return Array.from(productMap.values());
//                 });
//             } catch (error) {
//                 console.error('Error fetching the products:', error);
//                 alert('Đã xảy ra lỗi khi thêm hàng vào giỏ')
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, [currentPage,productsPerPage]);
//     const fetchProductsBySellerId = async (sellerId: number) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:5295/Find_Product_UserId/${sellerId}`);
//             setSellerProducts(response.data);
//         } catch (error) {
//             console.error('Error fetching the products by sellerId:', error);
//             alert('Đã xảy ra lỗi khi lấy sản phẩm theo SellerId');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//
//     const handleLoadMore = () => {
//         setCurrentPage(prevPage => prevPage + 1);
//     };
//     return (
//         <ProductContext.Provider value={{ products, setProducts, currentPage, setCurrentPage, productsPerPage, setProductsPerPage, loading, handleLoadMore, fetchProductsBySellerId}}>
//             {children}
//         </ProductContext.Provider>
//     );
// };
