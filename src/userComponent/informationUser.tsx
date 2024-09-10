import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addInfoUser, fetchInformationsByUserid, updateInfoUser} from '../Thunks/informationUserThunk';
import { selectUserInfo, selectUserInfoLoading, selectUserInfoError } from '../Slices/informationUserSlice';
import { selectUserId } from '../Slices/authSlice';
import {UserInfo} from "../Types/TypeInfor";

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

            dispatch(fetchInformationsByUserid({ userid: userId }));
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
        const { name, value } = e.target;
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
        console.log('adduserid:',newUserInfo.user_id)
        if(addInfoUser.fulfilled.match(resultAction)){
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
        const { name, value } = e.target;
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

        if(updateInfoUser.fulfilled.match(resultAction)){
            window.location.reload()
        }
    };


    if (loading) return <div>Loading...</div>;
    // if (!userInfo) return <div>No user info found</div>;
    return (
        <div className="flex flex-col items-center">
            {/* Hiển thị thông tin người dùng nếu đã tồn tại */}
            {userInfo ? (
                <div className='w-full justify-center items-center flex flex-row'>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                        <h1 >Thông Tin Người Dùng</h1>
                        <p><strong>Username:</strong> {userInfo.username}</p>
                        <p><strong>Phone:</strong> {userInfo.phone}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Address:</strong> {userInfo.address}</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-l ">
                        <h1 className="text-2xl font-bold text-center mb-6">Thay đổi thông tin người dùng</h1>
                        {loading ? <div>Loading...</div> : (
                            <form onSubmit={handleSubmit} className='flex flex-col'>
                                <input type="text" name="username" value={editUserInfo.username} onChange={handleInputChange} placeholder="Username" />
                                <input type="text" name="phone" value={editUserInfo.phone} onChange={handleInputChange} placeholder="Phone" />
                                <input type="text" name="email" value={editUserInfo.email} onChange={handleInputChange} placeholder="Email" />
                                <input type="text" name="address" value={editUserInfo.address} onChange={handleInputChange} placeholder="Address" />
                                <button type="submit">Cập nhật thông tin</button>
                            </form>
                        )}
                        {error && <p>{error}</p>}
                    </div>

                </div>


            ) : (
                // Hiển thị form thêm thông tin người dùng
                <div className="w-full">
                    {!showForm && (
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
                            onClick={() => setShowForm(true)}
                        >
                            Thêm Thông Tin
                        </button>
                    )}
                    {showForm && (
                        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                            <h1 className="text-2xl font-bold text-center mb-6">Thêm Thông Tin Người Dùng</h1>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input
                                    type="number"
                                    name="user_id"
                                    value={newUserInfo.user_id}
                                    onChange={handleFormChange}
                                    placeholder="ID người dùng"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                <input
                                    type="text"
                                    name="username"
                                    value={newUserInfo.username}
                                    onChange={handleFormChange}
                                    placeholder="Tên người dùng"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                <input
                                    type="number"
                                    name="phone"
                                    value={newUserInfo.phone}
                                    onChange={handleFormChange}
                                    placeholder="Số điện thoại"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={newUserInfo.email}
                                    onChange={handleFormChange}
                                    placeholder="Email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={newUserInfo.address}
                                    onChange={handleFormChange}
                                    placeholder="Địa chỉ"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />

                                {error && <p className="text-red-500">{error}</p>}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
};

export default UserInfoComponent;
