// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import { useUserContext } from '../Context/UserContext';
// import {Link} from "react-router-dom";
// import FindInformationUser from "./FindInformationUser";
//
//
// const InformationUser: React.FC = () => {
//     interface UserInformatin{
//         username: string;
//         phone:number;
//         email: string;
//         address: string;
//     }
//
//     const [Users, setUsers] = useState('');
//     // const[idname, setidname] = useState('');
//     const [username, setUsername] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');
//     const { userId } = useUserContext(); // Đảm bảo đúng tên biến userId
//     const token = localStorage.getItem('authToken');
//     // const userId = localStorage.getItem('userId');
//     // console.log('token',token)
//     //lấy Id của người dùng sau khi đăng nhập
//     useEffect(() => {
//         const authToken = localStorage.getItem('authToken');
//         const userId = localStorage.getItem('userId');
//         // console.log('ID:', userId);
//         // console.log('Context userId:', authToken);
//     }, [userId]);
//     //Lưu thông tin người dùng
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//
//         try {
//             await axios.post('http://localhost:5295/api/AddInformation', {
//                 Username: username,
//                 Phone: phone,
//                 Email: email,
//                 Address: address,
//                 User_id: userId // Gửi userId lên server để lưu vào InformationUser
//             });
//             // console.log('UserId', userId);
//             setUsername('');
//             setPhone('');
//             setEmail('');
//             setAddress('');
//             alert('Thông tin đã được lưu thành công!');
//         } catch (error) {
//             console.error('Lỗi khi gửi thông tin:', error);
//             alert('Đã xảy ra lỗi khi gửi thông tin!');
//         }
//     };
//     return (
//         <div className=''>
//
//             <div>
//                 <div className=' flex w-screen h-32'>
//                     <div className='text-black text-3xl flex justify-center items-center ml-16 font-serif'>
//                         <Link to='/'>
//                             Trang chủ
//                         </Link>
//                     </div>
//                 </div>
//                 <div className='flex flex-row justify-center items-center'>
//                     <form onSubmit={handleSubmit} className=' flex justify-center items-center flex-col'>
//                             <div className='flex flex-row '>
//                                 <div className='flex flex-col'>
//                                     <div className='text-black text-xl m-10'>
//                                         <label>Tên người dùng</label>
//                                     </div>
//                                     <div className='text-black text-xl m-10'>
//                                         <label>Số điện thoại</label>
//                                     </div>
//                                     <div className='text-black text-xl m-10'>
//                                         <label>Email</label>
//                                     </div>
//                                     <div className='text-black text-xl m-10'>
//                                         <label>Địa chỉ</label>
//                                     </div>
//                                 </div>
//                                 <div className='flex flex-col justify-center items-center'>
//                                     <input className='m-10 border border-gray-500 rounded-lg w-80 h-10' placeholder='Nhập vào tên người dùng' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                                     <input className='m-7 border border-gray-500 rounded-lg w-80 h-10' placeholder='Nhập vào số điện thoại người dùng' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//                                     <input className='m-10 border border-gray-500 rounded-lg w-80 h-10' placeholder='Nhập vào email người dùng' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                     <input className='m-7 border border-gray-500 rounded-lg w-80 h-10' placeholder='Nhập vào địa chỉ người dùng' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//                                 </div>
//                             </div>
//
//                             <button type="submit" className='hover:bg-green-400 w-28 h-14 rounded-lg border border-gray-500'>Save</button>
//                     </form>
//
//                 </div>
//
//             </div>
//         </div>
//     );
// };
//
// export default InformationUser;
