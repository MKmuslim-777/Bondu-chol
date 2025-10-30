import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
        <div>
            <section>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </section>
        </div>
    );
};

export default AuthLayout;