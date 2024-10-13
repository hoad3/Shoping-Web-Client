import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Product} from "../Slices/productSlice";


export const PRODUCTS_LIMIT = 4;

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page: number, { rejectWithValue }) => {
        console.log('Fetching products for page:', page);
        try {
            const response = await axios.get(`http://localhost:5295/Get_All_Produc?page=${page}&limit=${PRODUCTS_LIMIT}`);
            console.log('true product',response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error as Error || 'Có lỗi xảy ra');
        }
    }
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData: Omit<Product, 'id'>, { rejectWithValue }) => {
        try {
            const response = await axios.put('http://localhost:5295/AddProduct', productData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Đặt header Content-Type đúng
                },
            });
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            if (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('Something went wrong');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (updatedProduct: Product, { rejectWithValue }) => {
        try {
            // Tạo đối tượng FormData để gửi dữ liệu
            const formData = new FormData();
            formData.append('name', updatedProduct.name);
            formData.append('value', updatedProduct.value.toString());
            formData.append('decription', updatedProduct.decription);
            formData.append('stockquantity', updatedProduct.stockquantity.toString());
            formData.append('sellerid', updatedProduct.sellerid.toString());
            formData.append('daycreated', updatedProduct.daycreated);
            if (updatedProduct.image) {
                formData.append('image', updatedProduct.image); // Đính kèm file ảnh nếu có
            }

            // Gọi API PATCH với ID sản phẩm
            const response = await axios.patch(`http://localhost:5295/ChangeProduct/${updatedProduct.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đặt header
                },
            });

            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            return rejectWithValue(error as Error || 'Có lỗi xảy ra khi thay đổi sản phẩm');
        }
    }
);

export const Find_Product = createAsyncThunk(
    'product/findproduct',
          async (productid,{ rejectWithValue }) => {
                try {
                    const response = await axios.get(`http://localhost:5295/Find_a_Product?id=${productid}`);

                   return response.data

                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    return rejectWithValue('Failed to fetch product');
                }
            }

)
