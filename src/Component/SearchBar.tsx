import React, {useState} from 'react';
import {searchAdminProduct} from "../Thunks/adminThunk";
import {FaMagnifyingGlass} from "react-icons/fa6";

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = () => {
        // Gọi thunk tìm kiếm khi người dùng nhấn vào icon tìm kiếm
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(searchAdminProduct(searchTerm));
    };

    return (
        <div className="flex justify-center h-20 bg-gray-100 items-center">
            <div className="relative ">
                <div className='flex flex-row justify-center items-center'>
                    <div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[900px] h-10 pl-10 pr-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                        />
                    </div>
                        <button onClick={handleSearch} className='ml-5'>
                            <FaMagnifyingGlass  className="w-5 h-5 text-gray-600" />
                        </button>
                </div>



            </div>
        </div>
    );
};

export default SearchBar;
