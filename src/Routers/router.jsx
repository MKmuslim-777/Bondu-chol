import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayouts from '../Layouts/HomeLayouts';
import Home from '../Components/Home';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Pages/Login';
import AllFriends from '../Components/AllFriends';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayouts,
        children: [
            {
                path: "/",
                loader: () => fetch("../friendsData.json"),
                Component: Home
            }
        ]
        
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            }
        ]
    }
]);

export default router;