import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../App";
import LoginForm from "../Form/LoginForm";
import Register from "../Form/Register";
import Home from "../Form/Home"
// import Test from "../Form/Test"
import InformationUser from "../UserForm/InformationUser"
import FindInformationUser from "../UserForm/FindInformationUser";
import Cart from "../Component/Cart";
// import Product from "../Component/Product";
import SellerProducts from "../Component/Product";
import ProductDetails from "../Component/InformationProduct";

// import UpdateProduct from "../Component/UpdateProduct";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children:  [
            {
              index:true,
                path:'/',
              element:<Home/>
            },
            {
                path: "Login",
                element:<LoginForm/>
            },
            {
                path:"Register",
                element:<Register/>
            },
            // {
            //         path:"Test",
            //     element:<Test/>
            // },
            {
                path:"Information_User",
                element:<InformationUser/>
            },
            {
              path:"FindInformationUser",
              element:<FindInformationUser/>
            },
            {
                path:"Cart",
                element:<Cart/>
            },
            {
                path: "Product",
                element:<SellerProducts/>
            },
            {
              path:"/product/:id",
                element:<ProductDetails/>,

            }
        ]
    }
])


//
// export default AppRoutes;