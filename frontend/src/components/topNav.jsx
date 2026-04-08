import React from "react";
import { Flex, Switch } from "antd";
import { MoonOutlined, SunOutlined, AudioOutlined } from "@ant-design/icons";
import "../styles/TopNav.css";
import { useTheme } from "../styles/ThemeContext.jsx";

export default function TopNav() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="topNavWrapper p-4">
      <Flex justify="space-between" align="center" className="w-full">
       <div className="flex items-center gap-2">
        <AudioOutlined />
       <p className="" style={{ fontStyle: "italic" }}>Sally.io</p>
        </div>
        <Switch
          checked={isDark}
          onChange={setIsDark}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        />
      </Flex>
    </div>
  );
}