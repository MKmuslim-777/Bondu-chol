import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Components/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import AllFriends from "../Components/AllFriends";
import Memories from "../Components/Memories";
import Register from "../Pages/Auth/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AdminDashboardHome from "../Pages/Dashboard/AdminDashBoard/AdminDashboardHome/AdminDashboardHome";
import Gallery from "../Pages/Galllery/Gallery";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayouts,
    children: [
      {
        path: "/",
        loader: () => fetch("../friendsData.json"),
        Component: Home,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <AdminDashboardHome></AdminDashboardHome>,
      },
      {
        path: "all-friends",
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
