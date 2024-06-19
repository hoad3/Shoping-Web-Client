import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
interface Product {
    id: number;
    name: string;
    value: number;
    image: string;
    decription: string;
    stockquantity: number;
    sellerid: number;
    daycreated: string;
}

interface SellerProductsProps {
    sellerId: number;
}

const SellerProducts: React.FC<SellerProductsProps> = ({ sellerId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { userId } = useUserContext();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editFormData, setEditFormData] = useState<Product>({
        id: 0,
        name: "",
        value: 0,
        image: "",
        decription: "",
        stockquantity: 0,
        sellerid: 0,
        daycreated: ""
    });
    const [newProductData, setNewProductData] = useState<Product>({
        id: 0,
        name: "",
        value: 0,
        image: "",
        decription: "",
        stockquantity: 0,
        sellerid: userId!, // assert non-null
        daycreated: new Date().toISOString()
    });

    useEffect(() => {
        const fetchProductsBySellerId = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5295/Find_Product_UserId/${userId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching the products by sellerId:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsBySellerId();
    }, [sellerId, userId]);

    const handleEditProduct = (productId: number) => {
        const productToEdit = products.find(product => product.id === productId);
        if (productToEdit) {
            setEditingProduct(productToEdit);
            setEditFormData(productToEdit);
        }
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setEditFormData({
            ...editFormData,
            [fieldName]: fieldValue
        });
    };

    const handleEditFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5295/ChangeProduct`, editFormData);
            const updatedProducts = products.map(product =>
                product.id === response.data.id ? response.data : product
            );
            setProducts(updatedProducts);
            setEditingProduct(null);
            setEditFormData({
                id: 0,
                name: "",
                value: 0,
                image: "",
                decription: "",
                stockquantity: 0,
                sellerid: 0,
                daycreated: ""
            });
        } catch (error) {
            console.error('Error updating the product:', error);
        }
    };

    const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setNewProductData({
            ...newProductData,
            [fieldName]: fieldValue
        });
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            ...newProductData,
            value: parseInt(newProductData.value.toString(), 10), // chắc chắn rằng value và stockquantity là kiểu số
            stockquantity: parseInt(newProductData.stockquantity.toString(), 10), //
            sellerid: userId! // assert non-null
        };
        console.log('Adding Product:', productData); // in thông tin Product trước khi gửi lên server
        try {
            const response = await axios.put(`http://localhost:5295/AddProduct`, productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            setProducts([...products, response.data]);
            setNewProductData({
                id: 0,
                name: "",
                value: 0,
                image: "",
                decription: "",
                stockquantity: 0,
                sellerid: userId!,
                daycreated: new Date().toISOString()
            });

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await axios.delete(`http://localhost:5295/DeleteProduct?id=${productId}`);
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (loading) {
        return <div className='bg-gray-200'>Loading...</div>;
    }

    return (
        <div className='bg-gray-200 h-screen '>
            <div className='text-4xl font-serif w-72 h-32 flex justify-center items-center'>
                <Link to='/'>
                    <IoHomeOutline />
                </Link>
            </div>
                <div className='flex flex-row '>
                    <div className=''>
                        <form onSubmit={handleAddProduct} className='flex flex-col justify-start items-center'>
                            <div className='flex flex-row border border-gray-300 bg-gray-100 rounded-lg shadow-2xl w-9/12'>
                                <div className='flex flex-col w-80 m-5'>
                                    <div className='m-5 h-10'>
                                        Tên sản phầm:

                                    </div>
                                    <div className='m-5 h-10'>
                                        Giá bán:
                                    </div>
                                    <div className='m-5 h-10'>
                                        Hình ảnh mô tả:

                                    </div>
                                    <div className='m-5 h-10'>
                                        Mô tả:

                                    </div>
                                    <div className='m-5 h-10'>
                                        Số lượng tồn kho:

                                    </div>
                                </div>
                                <div className='flex flex-col m-5 w-[500px]'>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Tên sản phẩm"
                                        value={newProductData.name}
                                        onChange={handleNewProductChange}
                                        className='m-5 h-10 border border-gray-300 rounded-lg'
                                    />
                                    <input
                                        type="number"
                                        name="value"
                                        placeholder="Giá"
                                        value={newProductData.value}
                                        onChange={handleNewProductChange}
                                        className='m-5 h-10 border border-gray-300 rounded-lg'
                                    />
                                    <input
                                        type="text"
                                        name="image"
                                        placeholder="URL hình ảnh"
                                        value={newProductData.image}
                                        onChange={handleNewProductChange}
                                        className='m-5 h-10 border border-gray-300 rounded-lg'
                                    />
                                    <input
                                        type="text"
                                        name="decription"
                                        placeholder="Mô tả"
                                        value={newProductData.decription}
                                        onChange={handleNewProductChange}
                                        className='m-5 h-10 border border-gray-300 rounded-lg'
                                    />
                                    <input
                                        type="number"
                                        name="stockquantity"
                                        placeholder="Số lượng "
                                        value={newProductData.stockquantity}
                                        onChange={handleNewProductChange}
                                        className='m-5 h-10 border border-gray-300 rounded-lg'
                                    />
                                </div>

                            </div>
                            <button type="submit" className='m-5 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-36 h-10 rounded-lg text-white font-serif'>Thêm sản phẩm</button>
                        </form>
                    </div>
                    <div className='flex justify-center items-start'>
                        <ul className='overflow-y-scroll h-[440px] border border-gray-300 bg-gray-100 rounded-lg shadow-2xl'>
                            {products.map(product => (
                                <li key={product.id}>
                                    <div className='flex flex-row '>
                                        <div className='m-5'>
                                            <img src={product.image} alt={product.name} className='w-28 h-28'/>
                                        </div>
                                        <div className='m-5'>
                                            <h3>{product.name}</h3>
                                            <p className='w-96'>Mô tả: {product.decription}</p>
                                            <p>Giá: {product.value + ".đ"}</p>
                                            <p>Số lượng: {product.stockquantity}</p>
                                            <button className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif m-4' onClick={() => handleEditProduct(product.id)}>Chỉnh sửa</button>
                                            <button className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif m-4' onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {editingProduct && (
                        <form onSubmit={handleEditFormSubmit} className='flex flex-col justify-start items-center'>
                            <div className='flex flex-row border border-gray-300 bg-gray-100 rounded-lg shadow-2xl'>
                                <div className='flex flex-col w-28 m-5'>
                                    <div  className='m-5 h-10'>
                                        Tên sản phẩm
                                    </div>
                                    <div  className='m-5 h-10'>
                                        Mô tả
                                    </div >
                                    <div  className='m-5 h-10'>
                                        Hình ảnh
                                    </div>
                                    <div  className='m-5 h-10'>
                                        Giá
                                    </div>
                                    <div className='m-5 h-10'>
                                        Số lượng
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex flex-col'>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Tên sản phẩm"
                                            value={editFormData.name}
                                            onChange={handleEditFormChange}
                                            className='m-5 h-10 border border-gray-300 rounded-lg'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="decription"
                                            placeholder="Mô tả"
                                            value={editFormData.decription}
                                            onChange={handleEditFormChange}
                                            className='m-5 h-10 border border-gray-300 rounded-lg'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="image"
                                            placeholder="Hình ảnh"
                                            value={editFormData.image}
                                            onChange={handleEditFormChange}
                                            className='m-5 h-10 border border-gray-300 rounded-lg'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            name="value"
                                            placeholder="Giá"
                                            value={editFormData.value}
                                            onChange={handleEditFormChange}
                                            className='m-5 h-10 border border-gray-300 rounded-lg'
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            name="stockquantity"
                                            placeholder="Số lượng"
                                            value={editFormData.stockquantity}
                                            onChange={handleEditFormChange}
                                            className='m-5 h-10 border border-gray-300 rounded-lg'
                                        />
                                    </div>
                                    <div>

                                    </div>

                                </div>
                            </div>
                            <button className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif m-4' type="submit">Lưu</button>
                        </form>
                    )}
                </div>
        </div>
    );
};

export default SellerProducts;
