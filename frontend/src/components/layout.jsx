import React from "react";
import {Outlet} from "react-router-dom";
import TopNav from "./topNav";
import Footer from "./footer";

export default function Layout () {
    
    return (
        <>
        <div>
    <TopNav/>
     <main className="px-12 py-12">
      <Outlet />
      </main>
    <Footer></Footer>
    </div>

        </>
    )
}