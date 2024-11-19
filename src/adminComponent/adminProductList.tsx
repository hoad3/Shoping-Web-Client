import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import {useEffect, useState} from "react";
import {fetchAdminProduct, searchAdminProduct} from "../Thunks/adminThunk";
import HeaderComponent from "../homeConponent/headerComponent";
import {FaMagnifyingGlass} from "react-icons/fa6";


const AdminProductList: React.FC = () => {
    const dispatch = useDispatch();
    const { adminProduct, loading, error } = useSelector((state: RootState) => state.adminProduct);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(fetchAdminProduct());
    }, [dispatch]);

    const handleSearch = () => {
        // Gọi thunk tìm kiếm khi người dùng nhấn vào icon tìm kiếm
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(searchAdminProduct(searchTerm));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <HeaderComponent />
            <h1 className="text-2xl font-bold mt-28 mb-10 w-full flex justify-center">Danh sách loại sản phẩm</h1>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Nhập từ khóa để tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <button onClick={handleSearch} className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                    <FaMagnifyingGlass  className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                    <div className="bg-gray-100 border-b">
                        <div className="flex justify-between p-4">
                            <span className="font-semibold w-1/3">Tên sản phẩm</span>
                            <span className="font-semibold w-1/4 text-center">ẢNh mô tả</span>
                            <span className="font-semibold w-1/4 text-center">Giá tiền</span>
                            <span className="font-semibold w-1/4 text-center">Mô tả</span>
                            <span className="font-semibold w-1/4 text-center">Số lượng</span>
                            <span className="font-semibold w-1/4 text-center">Ngày nhập</span>
                        </div>
                    </div>
                    <div>
                        {adminProduct.map(product => (
                            <div
                                key={product.id}
                                className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50"
                            >
                                <span className="w-1/3">{product.name}</span>
                                <span className="w-1/4 text-center">
                                    <img src={product.image} alt={product.name} className="max-w-full h-auto rounded" />
                                </span>
                                <span className="w-1/4 text-center">{product.value}</span>
                                <span className="w-1/4 text-center">{product.decription}</span>
                                <span className="w-1/4 text-center">{product.stockquantity}</span>
                                <span className="w-1/4 text-center">{product.daycreated}</span>
                                <div className="w-1/6 text-center">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductList;