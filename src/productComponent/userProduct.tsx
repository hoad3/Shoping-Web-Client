import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteUserProduct, fetchProductsByUserId} from '../Thunks/userProductThunk';
import { selectProducts, selectProductsLoading, selectProductsError } from '../Slices/userProductSlice';
import {addProduct, updateProduct} from "../Thunks/productThunk";
import {selectUserId} from "../Slices/authSlice";
import {Product} from "../Slices/productSlice";
import HeaderComponent from "../homeConponent/headerComponent";


const UserProductList: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectProductsLoading);
    const error = useSelector(selectProductsError);
    const userid = useSelector(selectUserId)

    const [productData, setProductData] = useState({
        id:0,
        name: '',
        value: 0,
        image: null as File | null, // Sửa thành null để lưu trữ file
        decription: '',
        stockquantity: 0,
        sellerid: 0,
        daycreated: new Date().toISOString(),
    });

    const [selectedProduct, setSelectedProduct] = useState(null); // Quản lý sản phẩm đang được chọn để cập nhật
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
        if (e.target.name === 'image') {
            const fileInput = e.target.files;
            if (fileInput && fileInput.length > 0) {
                const selectedFile = fileInput[0];
                setProductData({
                    ...productData,
                    image: selectedFile,  // Lưu tệp ảnh được chọn vào state
                });
                
                
            }
        } else {
            setProductData({
                ...productData,
                [e.target.name]: e.target.type === 'date' ? new Date(e.target.value).toISOString() : e.target.value,
            });
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra form trước khi gửi
        if (!validateForm()) {
            setFormError('Vui lòng điền đầy đủ thông tin vào tất cả các trường.');
            return; // Ngừng lại nếu form không hợp lệ
        }

        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('value', productData.value.toString());
        formData.append('decription', productData.decription);
        formData.append('stockquantity', productData.stockquantity.toString());
        if (productData.image) {
            formData.append('image', productData.image); // Đảm bảo rằng bạn đính kèm tệp ảnh
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        formData.append('sellerid', userid.toString()); // Gán userId vào sellerid
        formData.append('daycreated', productData.daycreated);

        if (productData.image) {
            console.log('File details:', {
                name: productData.image.name,
                type: productData.image.type,
                size: productData.image.size,
                lastModified: productData.image.lastModified,
            });
        }
        if (productData.image) {
            console.log('File name:', productData.image.name);
        }

        if (productData.image) {
            const fileUrl = URL.createObjectURL(productData.image);
            console.log('File URL:', fileUrl);
            // Đừng quên hủy bỏ URL khi không còn cần thiết
            // URL.revokeObjectURL(fileUrl);
        }
        // // Reset lỗi khi bắt đầu gửi dữ liệu
        // setFormError('');
        // // Cập nhật sellerid với userId trước khi gửi API
        const updatedProductData = {
            ...productData,
            sellerid: userid, // Gán userId vào sellerid
        };
        try {
            let resultAction;
            if (productData.id) {
                // Nếu có id, gọi updateProduct
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                resultAction = await dispatch(updateProduct(updatedProductData));
            } else {
                // Nếu không có id, gọi addProduct
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                resultAction = await dispatch(addProduct(updatedProductData));
            }

            // Nếu thao tác thành công, reload trang
            if (updateProduct.fulfilled.match(resultAction) || addProduct.fulfilled.match(resultAction)) {
                window.location.reload(); // Tải lại trang sau khi cập nhật/thêm thành công
            } else {
                // Xử lý lỗi nếu cần
                console.error("Error:", resultAction);
            }
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

    const handleEditProduct = (product: Product) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setSelectedProduct(product); // Đặt sản phẩm được chọn để cập nhật
        setProductData({
            id: product.id,
            name: product.name,
            value: product.value,
            image: null,
            decription: product.decription,
            stockquantity: product.stockquantity,
            sellerid: product.sellerid,
            daycreated: product.daycreated,
        });
    };

    return (
        <div className=''>
            <div>
                <div>
                    <HeaderComponent/>
                </div>
            </div>
            <div className='mt-14 flex flex-row justify-center m-5'>
                <div>
                    <h1>{selectedProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <input type="text" name="name" value={productData.id} onChange={handleChange} placeholder="Product Name" />
                        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" />
                        <input type="number" name="value" value={productData.value} onChange={handleChange} placeholder="Value" />
                        <input type="file" name="image" onChange={handleChange} accept="image/*" /> {/* Input để tải file */}
                        <input type="text" name="decription" value={productData.decription} onChange={handleChange} placeholder="Description" />
                        <input type="number" name="stockquantity" value={productData.stockquantity} onChange={handleChange} placeholder="Stock Quantity" />
                        <input type="number" name="daycreated" value={productData.daycreated} onChange={handleChange} placeholder="daycreated" />

                        <button type="submit" disabled={loading}>{selectedProduct ? 'Update Product' : 'Add Product'}</button>
                        {error && <p>{error}</p>}
                        {formError && <p style={{ color: 'red' }}>{formError}</p>}
                    </form>
                </div>
                <div>
                    <h1>Product List</h1>
                    <ul>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <li key={product.id}>
                                    <img src={product.image} alt={product.name} />
                                    <h2>{product.id}</h2>
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <p>Price: {product.value}</p>
                                    <p>Stock: {product.stockquantity}</p>
                                    <button onClick={() => handleEditProduct(product)}>Update Product</button>
                                    <button onClick={() => handleDeleteUserProduct(product.id)}>Remove</button>
                                </li>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default UserProductList;
