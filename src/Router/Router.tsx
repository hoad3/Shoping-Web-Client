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
import ShipperComponent from "../DeliveryComponent/Shipper"
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
                element:<ShipperComponent/>
            }
        ]
    }
])


//
// export default AppRoutes;