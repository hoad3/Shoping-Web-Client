import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addInfoUser, fetchInformationsByUserid, updateInfoUser} from '../Thunks/informationUserThunk';
import { selectUserInfo, selectUserInfoLoading, selectUserInfoError } from '../Slices/informationUserSlice';
import { selectUserId } from '../Slices/authSlice';
import {UserInfo} from "../Types/TypeInfor";
import HeaderComponent from "../homeConponent/headerComponent";

const UserInfoComponent: React.FC = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const loading = useSelector(selectUserInfoLoading);
    const error = useSelector(selectUserInfoError);
    const userId = useSelector(selectUserId);
    const [showForm, setShowForm] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        user_id: Number(userId),
        username: '',
        phone: 0,
        email: '',
        address: ''
    });
    useEffect(() => {
        if (userId) {
            console.log(userId)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error

            dispatch(fetchInformationsByUserid({userid: userId}));
        }
    }, [dispatch, userId]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const [editUserInfo, setEditUserInfo] = useState<UserInfo>({
        idname: userInfo?.idname || 0,
        user_id: Number(userId) || 0,
        username: userInfo?.username || '',
        phone: userInfo?.phone || 0,
        email: userInfo?.email || '',
        address: userInfo?.address || '',
        user: userInfo?.user || '',
    });
    // Dùng useEffect để cập nhật editUserInfo khi userInfo thay đổi
    useEffect(() => {
        if (userInfo) {
            setEditUserInfo({
                idname: userInfo.idname || 0,
                user_id: Number(userId) || 0,
                username: userInfo.username || '',
                phone: userInfo.phone || 0,
                email: userInfo.email || '',
                address: userInfo.address || '',
                user: userInfo.user || '',
            });
        }
    }, [userInfo, userId]);


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const resultAction = await dispatch(addInfoUser(newUserInfo));
        console.log('adduserid:', newUserInfo.user_id)
        if (addInfoUser.fulfilled.match(resultAction)) {
            window.location.reload()
        }
        setShowForm(false); // Ẩn form sau khi submit
    };
// Cập nhật `editUserInfo` khi `userId` thay đổi
    useEffect(() => {
        if (userId) {
            setEditUserInfo(prevState => ({
                ...prevState,
                user_id: Number(userId), // Chuyển userId thành số khi thay đổi
            }));
        }
    }, [userId]); // Chỉ chạy khi userId thay đổi
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditUserInfo({
            ...editUserInfo,
            [name]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const resultAction = await dispatch(updateInfoUser(editUserInfo));

        if (updateInfoUser.fulfilled.match(resultAction)) {
            window.location.reload()
        }
    };


    if (loading) return <div>Loading...</div>;
    // if (!userInfo) return <div>No user info found</div>;
    return (

        <div className="flex min-h-screen bg-gray-100 p-4 w-full">

            <HeaderComponent/>
            {/* Hiển thị thông tin người dùng nếu đã tồn tại */}
            {userInfo ? (
                <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                    {/* Phần hiển thị thông tin người dùng */}

                    {/*<div className="p-6 w-full max-w-lg">*/}
                    {/*    <h1 className="text-2xl font-bold text-gray-700 mb-4">Thông Tin Người Dùng</h1>*/}
                    {/*    <p className="text-gray-600"><strong>Username:</strong> {userInfo.username}</p>*/}
                    {/*    <p className="text-gray-600"><strong>Phone:</strong> {userInfo.phone}</p>*/}
                    {/*    <p className="text-gray-600"><strong>Email:</strong> {userInfo.email}</p>*/}
                    {/*    <p className="text-gray-600"><strong>Address:</strong> {userInfo.address}</p>*/}
                    {/*</div>*/}

                    {/* Phần cập nhật thông tin người dùng */}
                    <div className="p-6 w-full max-w-lg">
                        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Thay Đổi Thông Tin Người Dùng</h1>
                        {loading ? <div className="text-gray-500">Loading...</div> : (
                            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                                <input
                                    type="text"
                                    name="username"
                                    value={editUserInfo.username}
                                    onChange={handleInputChange}
                                    placeholder="Username"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={editUserInfo.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={editUserInfo.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={editUserInfo.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                                >
                                    Cập nhật thông tin
                                </button>
                            </form>
                        )}
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                </div>
            ) : (
                // Hiển thị form thêm thông tin người dùng
                <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    {!showForm && (
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
                            onClick={() => setShowForm(true)}
                        >
                            Thêm Thông Tin
                        </button>
                    )}
                    {showForm && (
                        <div className="p-8 w-full max-w-lg">
                            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Thêm Thông Tin Người Dùng</h1>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input
                                    type="number"
                                    name="user_id"
                                    value={newUserInfo.user_id}
                                    onChange={handleFormChange}
                                    placeholder="ID người dùng"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="username"
                                    value={newUserInfo.username}
                                    onChange={handleFormChange}
                                    placeholder="Tên người dùng"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    name="phone"
                                    value={newUserInfo.phone}
                                    onChange={handleFormChange}
                                    placeholder="Số điện thoại"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={newUserInfo.email}
                                    onChange={handleFormChange}
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={newUserInfo.address}
                                    onChange={handleFormChange}
                                    placeholder="Địa chỉ"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {error && <p className="text-red-500">{error}</p>}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-all duration-200">
                                        Lưu Thông Tin
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
export default UserInfoComponent;
