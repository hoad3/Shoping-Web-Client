import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteUserProduct, fetchProductsByUserId} from '../Thunks/userProductThunk';
import { selectProducts, selectProductsLoading, selectProductsError } from '../Slices/userProductSlice';
import {addProduct} from "../Thunks/addProductThunk";
import {selectUserId} from "../Slices/authSlice";


const UserProductList: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectProductsLoading);
    const error = useSelector(selectProductsError);
    const userid = useSelector(selectUserId)

    const [productData, setProductData] = useState({
        name: '',
        value: 0,
        image: '',
        decription: '',
        stockquantity: 0,
        sellerid: 0,
        daycreated: new Date().toISOString(),
    });

    const [formError, setFormError] = useState(''); // Lưu trạng thái lỗi
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(fetchProductsByUserId());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const handleDeleteUserProduct = async (Id: number) => {
        if(Id!== null)
        {
            console.log("deleteProduct:", Id); // Debugging line
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const resultAction = await dispatch(deleteUserProduct(Id))
            // Nếu thao tác xóa thành công, reload trang
            if (deleteUserProduct.fulfilled.match(resultAction)) {
                window.location.reload(); // Tải lại trang
            }

        }

    };
    const validateForm = () => {
        // Kiểm tra nếu bất kỳ trường nào trống
        if (!productData.name || !productData.value || !productData.image || !productData.decription || !productData.stockquantity) {
            return false;
        }
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra form trước khi gửi
        if (!validateForm()) {
            setFormError('Vui lòng điền đầy đủ thông tin vào tất cả các trường.');
            return; // Ngừng lại nếu form không hợp lệ
        }

        // Reset lỗi khi bắt đầu gửi dữ liệu
        setFormError('');
        // Cập nhật sellerid với userId trước khi gửi API
        const updatedProductData = {
            ...productData,
            sellerid: userid, // Gán userId vào sellerid
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const resultAction = await dispatch(addProduct(updatedProductData));

        // Nếu thêm sản phẩm thành công, reload trang
        if (addProduct.fulfilled.match(resultAction)) {
            window.location.reload(); // Tải lại trang
        }
    };

    return (
        <div className='flex flex-row justify-center m-5'>
            <div>
                <h1>Thêm Sản Phẩm Mới</h1>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" />
                    <input type="number" name="value" value={productData.value} onChange={handleChange} placeholder="Value" />
                    <input type="text" name="image" value={productData.image} onChange={handleChange} placeholder="Image URL" />
                    <input type="text" name="decription" value={productData.decription} onChange={handleChange} placeholder="Description" />
                    <input type="number" name="stockquantity" value={productData.stockquantity} onChange={handleChange} placeholder="Stock Quantity" />
                    {/*<input type="number" name="sellerid" value={productData.sellerid} onChange={handleChange} placeholder="Seller ID" />*/}
                    <button type="submit" disabled={loading}>Add Product</button>
                    {error && <p>{error}</p>}
                    {formError && <p style={{ color: 'red' }}>{formError}</p>}
                </form>
            </div>
            <div>
                <h1>Product List</h1>
                <ul>
                    {products.length > 0 ?(
                        products.map(product => (
                            <li key={product.id}>
                                <img src={product.image} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: {product.value}</p>
                                <p>Stock: {product.stockquantity}</p>
                                <button onClick={() => handleDeleteUserProduct(product.id)}>Remove</button>
                            </li>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserProductList;
