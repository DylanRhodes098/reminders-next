import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./topNav";
import Footer from "./footer";
import { Divider } from "antd";
import SideNav2 from "./sideNav2";
import SideNav from "./sideNav";
import "../styles/global.css";

export default function Layout() {
  return (
    <div className="Global min-h-screen flex flex-col">
      <TopNav />

      {/* Main area: sidenav (1/5) + page content (4/5) */}
      <main className="flex-grow">
        <div className="flex w-full h-full gap-6">
          {/* Left sidenav */}
          <aside className="w-[10%] min-w-[220px]">
            <div className="flex flex-col h-full">
              <div className="flex-1 min-h-0">
                <SideNav />
              </div>
              <Divider style={{ margin: 0 }} />
              <div>
              <SideNav2 />
              </div>
            </div>
          </aside>

          {/* Right content */}
          <section className="w-4/5">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}