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
import LoginForm from "./authComponent/LoginForm";
import Register from "./authComponent/Register";
import Test from "./Form/Test";
import InformationUser from "./UserForm/InformationUser";
import FindInformationUser from "./UserForm/FindInformationUser";
import Cart from "./Component/Cart";
import {Provider} from "react-redux";
import store from "./Redux/store";
import {router} from "./Router/Router";


function App(){
    return<>
        <div><Outlet/></div>
    </>

}

export default App;

