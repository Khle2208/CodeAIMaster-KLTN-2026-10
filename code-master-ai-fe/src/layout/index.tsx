import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Layout = ()=>{
    return(
        <div>
            <Navbar />
            <div className="px-12">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;