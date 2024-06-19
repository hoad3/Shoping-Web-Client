import React from 'react';

const SearchBar: React.FC = () => {
    return (
        <div className="flex justify-center h-20 bg-gray-100 items-center">
            <div className="relative ">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-[900px] h-10 pl-10 pr-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                />
                <svg
                    className="w-6 h-6 absolute left-2 top-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M22 21l-4.35-4.35M16.23 10.58a5.66 5.66 0 11-11.32 0 5.66 5.66 0 0111.32 0z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;
