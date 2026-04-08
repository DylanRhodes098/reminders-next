
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

import "../styles/SideNav.css";

export default function SideNav() {
  const navigate = useNavigate();

  return (
    
    <div className="sideNavWrapper sideNavTopPanel" style={{ paddingTop: 12 }}>
      <p className="pl-4" style={{ fontStyle: "italic" }}>Dashboard</p>

      <Menu
        mode="inline"
        selectable={false}
        items={[
          {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => navigate("/", { replace: true }),
          },
          {
            key: "Settings",
            icon: <SettingOutlined />,
            label: "Settings",
            onClick: () => navigate("/settings", { replace: true }),
          },
    
        ]}
      />
    </div>
  );
}
