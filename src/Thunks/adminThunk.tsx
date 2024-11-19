import {createAsyncThunk} from "@reduxjs/toolkit";



export const fetchAdminUsers = createAsyncThunk('users/fetchAdminUsers', async () => {
    const response = await fetch('http://localhost:5295/admin/user');

    // Kiểm tra xem phản hồi có thành công hay không
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const data = await response.json(); // Chuyển đổi phản hồi sang JSON
    return data; // Giả sử API trả về một mảng người dùng
});

export const fetchAdminProduct = createAsyncThunk('users/fetchAdminProduct', async () => {
    const response = await fetch('http://localhost:5295/admin/product');

    // Kiểm tra xem phản hồi có thành công hay không
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const data = await response.json(); // Chuyển đổi phản hồi sang JSON
    return data; // Giả sử API trả về một mảng người dùng
});

export const deleteUser = createAsyncThunk(
    'users/deleteUser', // tên của thunk
    async (userId: number) => {
        const response = await fetch(`http://localhost:5295/${userId}`, {
            method: 'DELETE', // Phương thức HTTP là DELETE
        });

        // Kiểm tra xem phản hồi có thành công hay không
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        return userId; // Trả về ID của người dùng đã xóa
    }
);

export const searchAdminProduct = createAsyncThunk('adminProduct/search', async (searchTerm: string) => {
    const response = await fetch(`http://localhost:5295/search?term=${searchTerm}`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
});

export const searchUsers = createAsyncThunk(
    'users/search',
    async (searchTerm) => {
        const response = await fetch(`http://localhost:5295/searchUser/${searchTerm}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data; // Giả sử API trả về một danh sách người dùng
    }
);