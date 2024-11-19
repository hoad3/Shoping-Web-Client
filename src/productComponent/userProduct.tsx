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
        id: 0,
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
        if (Id !== null) {
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
                <HeaderComponent/>
            </div>
            <div className='flex justify-center mt-14'>
                <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8 m-5'>
                    <h1 className='text-2xl font-semibold text-center mb-6'>
                        {selectedProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
                    </h1>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    name="id"*/}
                        {/*    value={productData.id}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    placeholder="Product ID"*/}
                        {/*    className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'*/}
                        {/*/>*/}
                        <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input
                            type="number"
                            name="value"
                            value={productData.value}
                            onChange={handleChange}
                            placeholder="Value"
                            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input
                            type="text"
                            name="description"
                            value={productData.decription}
                            onChange={handleChange}
                            placeholder="Description"
                            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input
                            type="number"
                            name="stockquantity"
                            value={productData.stockquantity}
                            onChange={handleChange}
                            placeholder="Stock Quantity"
                            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input
                            type="date"
                            name="daycreated"
                            value={productData.daycreated}
                            onChange={handleChange}
                            placeholder="Day Created"
                            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className='bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
                        >
                            {selectedProduct ? 'Update Product' : 'Add Product'}
                        </button>
                        {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
                        {formError && <p className='text-red-500 text-center mt-2'>{formError}</p>}
                    </form>
                </div>
            </div>
            <div className='w-full flex justify-center mt-10'>
                <div className="container mx-5 p-4 ">
                    <h1 className="text-2xl font-bold mb-4 flex justify-center">Sản phẩm tồn kho</h1>
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        {products.length > 0 ? (
                            <div>
                                <div
                                    className="grid grid-cols-12 gap-4 border-b border-gray-300 font-semibold text-gray-600 p-2">
                                    <div className="col-span-2">Image</div>
                                    <div className="col-span-2">ID</div>
                                    <div className="col-span-2">Name</div>
                                    <div className="col-span-3">Description</div>
                                    <div className="col-span-1">Price</div>
                                    <div className="col-span-1">Stock</div>
                                    <div className="col-span-1">Actions</div>
                                </div>
                                {products.map((product) => (
                                    <div key={product.id}
                                         className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 text-center">
                                        <div className="col-span-2 flex justify-center items-center">
                                            <img src={product.image} alt={product.name}
                                                 className="h-20 w-20 object-cover rounded-md"/>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center">
                                            <span>{product.id}</span>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center">
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                        <div className="col-span-3 flex items-center justify-center">
                                            <span className="text-gray-600">{product.decription}</span>
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center">
                                            <span className="font-semibold text-blue-600">${product.value}</span>
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center">
                                            <span>{product.stockquantity}</span>
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center space-x-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUserProduct(product.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center mt-4">No products found</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
export default UserProductList;
