import {useEffect, useState} from "react";
import {deleteUser, fetchAdminUsers, searchUsers} from "../Thunks/adminThunk";
import {RootState} from "../Redux/store";
import {useDispatch, useSelector} from "react-redux";
import HeaderComponent from "../homeConponent/headerComponent";

import {enqueueSnackbar} from "notistack";
import {FaMagnifyingGlass} from "react-icons/fa6";


const UserList: React.FC = () => {
    const dispatch = useDispatch();
    const { admins, loading, error } = useSelector((state: RootState) => state.adminUser);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(fetchAdminUsers());
    }, [dispatch]);
    const handleSearch = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(searchUsers(searchTerm));
    };
    const handleDelete = async (userid: number) =>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
       const resultAction = await dispatch(deleteUser(userid))

        if (deleteUser.fulfilled.match(resultAction)) {
            enqueueSnackbar('Đã xóa người dùng', { variant: 'success' });
            window.location.reload();
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <HeaderComponent />
            <h1 className="text-2xl font-bold mt-28">Danh sách tài khoản</h1>
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
                            <span className="font-semibold w-1/3">Account</span>
                            <span className="font-semibold w-1/4 text-center">ID</span>
                            <span className="font-semibold w-1/4 text-center">Role</span>
                            <span className="font-semibold w-1/6 text-center">Actions</span>
                        </div>
                    </div>
                    <div>
                        {admins.map(user => (
                            <div
                                key={user.id}
                                className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50"
                            >
                                <span className="w-1/3">{user.account}</span>
                                <span className="w-1/4 text-center">{user.id}</span>
                                {user.role === 1 &&(
                                    <span className="w-1/4 text-center">Người dùng bình thường</span>
                                )}
                                {user.role === 2 &&(
                                    <span className="w-1/4 text-center">Quản trị viên</span>
                                )}
                                {user.role === 3 &&(
                                    <span className="w-1/4 text-center">Shipper</span>
                                )}

                                <div className="w-1/6 text-center">
                                    <button
                                        onClick={() => handleDelete(user.id)}
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

export default UserList;