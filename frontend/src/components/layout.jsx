import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./topNav";
import Footer from "./footer";
import { Divider } from "antd";
import SideNav2 from "./sideNav2";
import SideNav from "./sideNav";
import SideNav3 from "./sideNav3";

export default function Layout() {
  return (
    <div className="Global min-h-screen flex flex-col">
      <TopNav />

      {/* Main area: sidenav (1/5) + page content (4/5) */}
      <main className="flex-grow flex flex-col min-h-0">
        <div className="flex flex-1 w-full gap-6 min-h-0 items-stretch px-6 pb-6 pt-4">
          {/* Left: SideNav (natural height, top) + SideNav2 (fills rest) */}
          <aside className="w-[10%] min-w-[220px] shrink-0 flex flex-col min-h-0 self-stretch rounded-2xl glass-panel-strong glass-inset overflow-hidden">
            <div className="shrink-0 px-2 pt-2">
              <SideNav />
            </div>
            <Divider style={{ margin: 0, padding: 1, borderColor: 'rgba(255,255,255,0.18)' }} />
            <div className="shrink-0 px-2">
              <SideNav3 />
            </div>
            <Divider style={{ margin: 0, padding: 1, borderColor: 'rgba(255,255,255,0.18)' }} />
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden px-2 pb-2">
              <SideNav2 />
            </div>
          </aside>

          {/* Right content */}
          <section className="w-4/5 flex-1 min-w-0 min-h-0 rounded-3xl glass-panel glass-inset overflow-hidden">
            <div className="h-full w-full p-6">
              <Outlet />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}