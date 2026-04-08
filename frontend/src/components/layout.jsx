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
      <main className="flex-grow flex flex-col min-h-0">
        <div className="flex flex-1 w-full gap-6 min-h-0 items-stretch">
          {/* Left: SideNav (natural height, top) + SideNav2 (fills rest) */}
          <aside className="w-[10%] min-w-[220px] shrink-0 flex flex-col min-h-0 self-stretch">
            <div className="shrink-0">
             
              <SideNav />
            </div>
            <Divider style={{ margin: 0 }} />
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <SideNav2 />
            </div>
          </aside>

          {/* Right content */}
          <section className="w-4/5 flex-1 min-w-0 min-h-0">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}