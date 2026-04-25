// - - -  React imports - - - //
import React from 'react';
import {useState} from "react";
import { Card, Select, Input, Switch } from "antd";
import { useTheme } from "../styles/ThemeContext.jsx";
import { MoonOutlined, SunOutlined   } from "@ant-design/icons";

const { TextArea } = Input;

export default function Settings() {

  const { isDark, setIsDark } = useTheme();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="flex flex-col gap-10 pt-4 w-full max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div>
        <h2>Theme</h2>
      <Switch
          checked={isDark}
          onChange={setIsDark}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        /> 
        </div>

      <div>
      <Card size="small" title="Difficulty" className="w-1/2">
        <div className="flex flex-wrap gap-2">
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
      </Card>
      </div>

      <div>
      <Card size="small" title="Difficulty" className="w-1/2">
         <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
      </Card>
    </div>
    </div>
  );
}
