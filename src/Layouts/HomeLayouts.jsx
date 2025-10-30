import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";

const HomeLayouts = () => {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main >
        <header className="">
        </header>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayouts;
