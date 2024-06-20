// import React, {useEffect, useState} from "react";
// import axios from "axios";
import {useUserContext} from "../Context/UserContext";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {IoHomeOutline} from "react-icons/io5";
// import { useUserContext } from '../context/UserContext';

interface InformationUser {
    idname: number;
    user_id: number;
    username: string;
    phone: number;
    email: string;
    address: string;
}
interface Useraccount{
    id: number;
    account:string;
    password:string;
}
const UserInfo: React.FC = () => {
    const { userId } = useUserContext();
    const [Useraccount,setUseraccount] = useState<Useraccount | null> (null)
    const [userInfo, setUserInfo] = useState<InformationUser | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [account, setAccount] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
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
    const handleAccount = async () =>{
        try{
            const respose = await axios.get<Useraccount>(`http://localhost:5295/Find_Account/${userId}`)
            setUseraccount(respose.data);
            setError(null);
            // console.log("thong tin tai khoan",Useraccount)
        }catch (err){
            setError("User not found")
            setUseraccount(null)
        }
    }
    const handleChangePassword = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5295/change-password', {
                account,
                newPassword,
            });
            setSuccess('Password changed successfully');
            setError(null);
        } catch (error) {
            setError('Could not change password');
            setSuccess(null);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // console.log('ID', userId)
    // console.log('idname', userInfo)
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
        <div className='flex flex-col'>
            <div className='w-72 flex items-center justify-center text-4xl mt-10'>
                <Link to='/'>
                    <IoHomeOutline />
                </Link>

            </div>
            <div className='flex h-screen justify-center items-center flex-row'>
                <div className='h-[432px] w-[384px] flex justify-start items-center bg-gray-200 rounded-lg shadow-md mr-36'>
                    <div className="">
                        <h2 className="text-2xl font-semibold mb-4 mt-5">Change Password</h2>
                        <form onSubmit={handleChangePassword} className='bg-gray-200 w-96 h-80'>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2 ml-2" htmlFor="account">
                                    Account
                                </label>
                                <input
                                    type="text"
                                    id="account"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2 ml-2" htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            {success && <p className="text-green-500 mb-4">{success}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {userInfo && (
                    <div className=''>
                        {editMode ? (
                            //Chỉnh sửa thông tin người dùng
                            <div className='flex flex-col justify-center items-center bg-gray-200 rounded-lg'>
                                <div className='flex justify-center items-center mt-5'>
                                    Chỉnh sửa thông tin người dùng
                                </div>
                                <div className='flex justify-center items-center'>
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
                                </div>

                                <div className='w-full flex justify-center items-center mb-5 '>
                                    <button onClick={handleUpdate} className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif mt-1'>Save</button>
                                    <button onClick={() => setEditMode(false)} className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif mt-1 ml-3'>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            //hiển thị thôngg tin người dùng
                            <div className='flex h-auto justify-center items-start flex-col w-96 bg-gray-200 rounded-lg'>
                                <div className='w-full flex justify-center items-center mt-10'>
                                    Chỉnh sửa thông tin người dùng
                                </div>
                                <div className='text-black text-xl m-5'>
                                    <p><strong>Username:</strong> {userInfo.username}</p>
                                </div>
                                <div className='text-black text-xl m-5'>
                                    <p><strong>Phone:</strong> {userInfo.phone}</p>
                                </div>
                                <div className='text-black text-xl m-5'>
                                    <p><strong>Email:</strong> {userInfo.email}</p>
                                </div>
                                <div className='text-black text-xl m-5'>
                                    <p><strong>Address:</strong> {userInfo.address}</p>
                                </div>
                                <div className='text-black text-xl w-full flex justify-center items-center mt-10 mb-3'>
                                    <button onClick={() => setEditMode(true)} className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-lg text-white font-serif mt-1'>Edit</button>
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
