import React from "react";
import { useState } from "react";
import { Flex, Dropdown, Space } from "antd";
import { AudioOutlined, UserOutlined, LogoutOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import "../styles/TopNav.css";
import "../styles/listStyle.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function TopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const onClickHome = () => {
    console.log('click logo');

    navigate("/");
  };

  const onClickDropDownMenu: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/user");
        break;
      case "2":
        navigate("/settings");
        break;
      case "3":
        logout();
        navigate("/login");
        break;
      default:
        break;
    }

    setDropdownOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span className="inline-flex items-center gap-1">
          Profile <TeamOutlined />
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span className="inline-flex items-center gap-1">
          Settings <SettingOutlined />
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span className="inline-flex items-center gap-1">
          Logout <LogoutOutlined />
        </span>
      ),
    },
  ];

 
  return (
    <div className="topNavWrapper p-4">
      <Flex justify="space-between" align="center" className="w-full">
       <div className="flex items-center gap-2" onClick={onClickHome} style={{ cursor: "pointer" }}>
        <AudioOutlined />
       <p className="" style={{ fontStyle: "italic" }}>Sally.io</p>
        </div>
        <div className="flex items-center gap-4">
       
   <Dropdown
            menu={{ items, onClick: onClickDropDownMenu }}
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            trigger={["click"]}
          >
          
              <Space>
                <UserOutlined className="account-icon" />
     
              </Space>
          </Dropdown>
        </div>
      </Flex>
    </div>
  );
}