import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    value: number;
    image: string;
    decription: string;
    stockquantity: number;
    sellerId: number;
    dayCreated: string;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5295/Find_a_Product?id=${id}`)
            .then((response) => response.json())
            .then((data: Product) => setProduct(data))
            .catch((error) => console.error('Lỗi khi lấy sản phẩm:', error));
    }, [id]);

    if (!product) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="product-details flex justify-center items-center">
            <div className='h-screen flex justify-center items-center flex-row w-3/4'>
                <div className='flex flex-row'>
                    <div>
                        <img src={product.image} alt={product.name} className='w-80 object-cover rounded-lg h-80'/>
                    </div>
                    <div className='flex flex-col ml-16'>
                        <h2>{product.name}</h2>
                        <p>Giá: {product.value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        <p>Mô tả: {product.decription}</p>
                        <p>Số lượng còn kho: {product.stockquantity}</p>
                    </div>
                </div>


            </div>

            {/*<p>Ngày tạo: {new Date(product.dayCreated).toLocaleDateString('vi-VN')}</p>*/}
        </div>
    );
};

export default ProductDetails;
