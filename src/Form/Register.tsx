import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const RegisterForm: React.FC = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        // Thực hiện đăng ký ở đây, ví dụ: gọi API đăng ký
        // console.log('Account:', account);
        // console.log('Password:', password);
        await axios.post('http://localhost:5295/register', {
            account,
            password
        })
    };

    return(
        <div className="h-screen flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="w-full max-w-md bg-gray-200 p-8 rounded-lg shadow-lg shadow-gray-600">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="account" className="block text-gray-700">Tài khoản</label>
                        <input
                            type="text"
                            id="account"
                            name="account"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Nhập tên tài khoản"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                        <Link to='/Login'>Đăng ký</Link>
                        </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;