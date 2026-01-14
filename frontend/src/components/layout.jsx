import React from "react";
import {Outlet} from "react-router-dom";
import TopNav from "./topNav";
import Footer from "./footer";

export default function Layout () {
    
    return (
        <>
        <div>
    <TopNav/>
     <main className="flex flex-row p-4">
            <div className="pr-[4%]">
      </div>
      <Outlet />
      </main>
    <Footer></Footer>
    </div>

        </>
    )
}