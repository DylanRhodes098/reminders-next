
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

import "../styles/SideNav.css";

export default function SideNav() {
  const navigate = useNavigate();

  return (
    <div className="sideNavWrapper" style={{ backgroundColor: "#f3f4f6", paddingTop: 12 }}>

      <Menu
        mode="inline"
        selectable={false}
        style={{backgroundColor: "#f3f4f6"}}
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
          }
        ]}
      />
    </div>
  );
}
