// - - -  React imports - - - //
import React from 'react';
import {useState} from "react";
import { Card, Select, Input } from "antd";

const { TextArea } = Input;

export default function Home() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="flex flex-col gap-10 pt-4 w-full max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div>
      <p className="font-bold">Prospect Description</p>
      <TextArea rows={4} placeholder="Description" className="w-full" />
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
