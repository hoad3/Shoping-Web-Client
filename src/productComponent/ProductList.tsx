import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../Thunks/productThunk';
import { RootState } from '../Redux/store';
import {Product, resetProducts} from "../Slices/productSlice";
import {addCartItem} from "../Thunks/addCartItemsThunk";
import ErrorNoCart from "../Error/errorNoCart";
import {enqueueSnackbar} from "notistack";

const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const { products, loading, error, hasMore,currentPage } = useSelector((state: RootState) => state.products);
    const cartId = useSelector((state: RootState) => state.getCartSlice.cartId);
    useEffect(() => {

         // Tải sản phẩm khi component mount
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(fetchProducts(1));

        // Cleanup
        return () => {
            dispatch(resetProducts());
        };
    }, [dispatch]);

    const handleLoadMore = () => {
        /*
         Tải thêm sản phẩm khi nhấn nút
        */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(fetchProducts(currentPage))
    };

    const handleAddToCart = (productId: number) => {
        if (cartId !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(addCartItem({ cartId, productId }));
            enqueueSnackbar('Thêm sản phẩm vào giỏ hàng thành công',{variant:'success'})
        } else {
            enqueueSnackbar('Chưa có giỏ hàng hãy tạo giỏ hàng!', { variant: 'error' });
            console.error("Cart ID is not available!");
        }
    };
    const uniqueProductIds = Array.from(new Set(products.map(product => product.id)));
    const uniqueProducts = uniqueProductIds
        .map(id => products.find(product => product.id === id))
        .filter((product): product is Product => product !== undefined);

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {uniqueProducts.map((product) => (
                    <div key={product.id} className="bg-white shadow-md p-4 rounded-md flex flex-col items-center transition-transform transition-rounded duration-300 transform hover:scale-105 hover:border-2 hover:border-red-400">

                        <h3 className="text-xl font-semibold mb-2 text-center">{product.name}</h3 >
                        <img src={product.image} alt={product.name} className="h-40 w-40 object-cover mb-4"/>
                        <p  className="text-gray-600 mb-2 text-center">{product.description}</p>
                        <p className="text-lg font-bold text-center">{product.value}</p>
                        <button
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {hasMore && (
                <button
                    onClick={handleLoadMore}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default ProductList;
