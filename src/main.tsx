import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
import {router} from "./Router/Router";
import {UserProvider} from "./Context/UserContext";
import { ProductProvider } from './Context/ProductContext';
import {AuthProvider} from "./Context/AuthContext";
import CartProviderWrapper from "./Context/CartProviderWrapper";
import App from "./App";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <UserProvider>
                <ProductProvider>
                    <CartProviderWrapper>
                        <RouterProvider router={router} />
                    </CartProviderWrapper>
                </ProductProvider>
            </UserProvider>
        </AuthProvider>
    </React.StrictMode>
);
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <AuthProvider>
//             <UserProvider>
//                 <ProductProvider>
//                         <CartProviderWrapper>
//                             <RouterProvider router={router}>
//                         </CartProviderWrapper>
//                     </RouterProvider>
//                 </ProductProvider>
//             </UserProvider>
//         </AuthProvider>
//     </React.StrictMode>
// )
{/*<CartProviderWrapper>*/}

{/*</CartProviderWrapper>*/}