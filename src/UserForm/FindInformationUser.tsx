// import React, {useEffect, useState} from "react";
// import axios from "axios";
import {useUserContext} from "../Context/UserContext";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
// import { useUserContext } from '../context/UserContext';

interface InformationUser {
    idname: number;
    user_id: number;
    username: string;
    phone: number;
    email: string;
    address: string;
}

const UserInfo: React.FC = () => {
    const { userId } = useUserContext();
    const [userInfo, setUserInfo] = useState<InformationUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<InformationUser>({
        idname: 0,
        user_id: 0,
        username: '',
        phone: 0,
        email: '',
        address: ''
    });

    useEffect(() => {
        if (userId !== null) {
            fetchUserInfo(userId);
        }
    }, [userId]);

    const fetchUserInfo = async (id: number) => {
        try {
            const response = await axios.get<InformationUser>(`http://localhost:5295/API/Find_Information_User/${id}`);
            setUserInfo(response.data);
            setFormData(response.data);
            setError(null);
        } catch (err) {
            setError('User not found');
            setUserInfo(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    console.log('ID', userId)
    console.log('idname', userInfo)
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5295/api/UpdateInformation`, formData);
            setUserInfo(response.data);
            setEditMode(false);
            setError(null);
        } catch (err) {
            setError('Update failed');
        }
    };

    return (
        <div className=''>
            <div className=''>
                <Link to='/'>
                    Trang Chủ
                </Link>

            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userInfo && (
                <div className=''>
                    {editMode ? (
                        //Chỉnh sửa thông tin người dùng
                        <div className='flex h-screen flex-col justify-center items-center'>
                            <div>
                                Chỉnh sửa thông tin người dùng
                            </div>
                            <div className='flex flex-col '>
                                <input
                                    className='border border-gray-500 w-80 h-10 rounded-xl m-8'
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="  Username"
                                />
                                <input
                                    className='border border-gray-500 w-80 h-10 rounded-xl m-8'
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                />
                                <input
                                    className='border border-gray-500 w-80 h-10 rounded-xl m-8'
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                                <input
                                    className='border border-gray-500 w-80 h-10 rounded-xl m-8'
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                />
                            </div>
                            <div>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditMode(false)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        //hiển thị thôngg tin người dùng
                        <div className='flex h-screen justify-center items-center flex-col'>
                            <div>
                                Chỉnh sửa thông tin người dùng
                            </div>
                            <div className='text-black text-xl m-8'>
                                <p><strong>Username:</strong> {userInfo.username}</p>
                            </div>
                            <div className='text-black text-xl m-8'>
                                <p><strong>Phone:</strong> {userInfo.phone}</p>
                            </div>
                            <div className='text-black text-xl m-8'>
                                <p><strong>Email:</strong> {userInfo.email}</p>
                            </div>
                            <div className='text-black text-xl m-8'>
                                <p><strong>Address:</strong> {userInfo.address}</p>
                            </div>
                            <div className='text-black text-xl m-8'>
                                <button onClick={() => setEditMode(true)}>Edit</button>
                            </div>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserInfo;
