import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

const Logout: React.FC = () => {
    const history = useNavigate ();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Xóa JWT từ localStorage
        navigate('/'); // Chuyển hướng người dùng về trang đăng nhập
    };

    return (
        <button onClick={handleLogout}>
            Đăng xuất
        </button>
    );
};

export default Logout;