import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import {BrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
// import {router} from "./Router/Router";
// import {UserProvider} from "./Context/UserContext";
// import { ProductProvider } from './Context/ProductContext';
// import {AuthProvider} from "./Context/AuthContext";
// import CartProviderWrapper from "./Context/CartProviderWrapper";
import App from "./App";
import store from "./Redux/store";
import {Provider} from "react-redux";
import {router} from "./Router/Router";
import {RouterProvider} from "react-router-dom";
import {SnackbarProvider} from "notistack";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>,
        </SnackbarProvider>
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