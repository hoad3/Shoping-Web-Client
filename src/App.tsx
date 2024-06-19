// import { useState } from 'react'
import './App.css'
import {
    createBrowserRouter,
    Link,
    Outlet, Route,
    RouteObject,
    Router,
    RouterProvider,
    Routes,
    useRoutes
} from "react-router-dom";
import React from "react";
import Home from "./Form/Home";
import LoginForm from "./Form/LoginForm";
import Register from "./Form/Register";
import Test from "./Form/Test";
import InformationUser from "./UserForm/InformationUser";
import FindInformationUser from "./UserForm/FindInformationUser";
import Cart from "./Component/Cart";


function App(){
    return<>
        <div><Outlet/></div>
    </>
    // return(
    //     <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/Login" element={<LoginForm />} />
    //         <Route path="/Register" element={<Register />} />
    //         <Route path="/Test" element={<Test />} />
    //         <Route path="/Information_User" element={<InformationUser />} />
    //         <Route path="/FindInformationUser" element={<FindInformationUser />} />
    //         <Route path="/Cart" element={<Cart />} />
    //     </Routes>
    // )
}

export default App;

