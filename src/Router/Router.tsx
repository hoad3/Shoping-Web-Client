import {createBrowserRouter} from "react-router-dom";
import App from "../App";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import Homepage from "../homeConponent/Homepage";
import LoginForm from "../authComponent/LoginForm";
import Register from "../authComponent/Register";
import UserProductList from "../productComponent/userProduct";
import UserInfoComponent from "../userComponent/informationUser";
import CartInfoComponent from "../cartComponent/getCartItemsComponent";
import AddOrderForm from "../paymentComponent/AddOrderForm";

import HandleOrderConponent from "../paymentComponent/HandleOrder";
// import ShipperComponent from "../DeliveryComponent/Shipper"
import ShipperInforComponent from "../DeliveryComponent/ShipperInforComponent";
import UserList from "../adminComponent/UserList";
import AdminProductList from "../adminComponent/adminProductList";
import FogotPassword from "../authComponent/FogotPassword";
import OTPVerify from "../authComponent/OTPVerify";
import PaymentResultPage from "../cartComponent/PaymentResultComponent";
import PaylistComponent from "../paymentComponent/PaylistComponent";
import ChangePassword from "../authComponent/ChangePassword";
export const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children:  [
            {
              index:true,
                path:'/',
              element:<Homepage/>
            },
            {
                path: "/Login",
                element:<LoginForm/>
            },
            {
                path:"Register",
                element:<Register/>
            },
            {
              path:'UserProduct',
                element:<UserProductList/>
            },
            {
                path:'userInfo',
                element:<UserInfoComponent/>
            },
            {
                path:'cartItem',
                element:<CartInfoComponent/>
            },
            {
                path:'donmua',
                element:<AddOrderForm/>
            },
            {
              path:'handleOrder',
                element:<HandleOrderConponent/>
            },
            {
                path:'shipper',
                element:<ShipperInforComponent/>
            },
            {
                path:'adminUser',
                element:<UserList/>
            },
            {
                path:'adminProduct',
                element:<AdminProductList/>
            },
            {
                path:'fogotpassword',
                element:<FogotPassword/>
            },
            {
                path:"otpverify",
                element:<OTPVerify/>
            },
            {
                path:"PaymentResultPage",
                element:<PaymentResultPage/>
            },
            {
                path:"Pay_List",
                element:<PaylistComponent/>
            },
            {
                path:"/fogotpassword/Changepassword",
                element:<ChangePassword/>
            }
        ]
    }
])


//
// export default AppRoutes;