import React from "react";
import {Outlet} from "react-router-dom";
import TopNav from "./topNav";
import Footer from "./footer";
import "../styles/global.css"

export default function Layout () {
    
    return (
        <>
        <div className="Global min-h-screen flex flex-col">
    <TopNav/>
     <main className="flex-grow px-12 py-12">
      <Outlet />
      </main>
    <Footer></Footer>
    </div>

        </>
    )
}