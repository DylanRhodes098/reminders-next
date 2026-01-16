import {useState} from "react";
import { login as loginUser} from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Card, Space } from 'antd';
import "../styles/LoginRegister.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    function warningMessage () {
        if (!err) {
          return null;
        }
        else {
          return <p style={{ color: "crimson" }}>{err}</p>
        }
      }

      const onFinish = async (values) => {
        setErr("");
        try {
            await loginUser({email: values.email || email, password: values.password || password});
            navigate("/", {replace: true} );
        } catch (error) {
            const errorMessage = error?.response?.data?.error || error?.response?.data?.msg || "login failed";
            if (errorMessage.includes("incorrect info") || errorMessage.includes("failed Logging in")) {
                setErr("User doesn't exist, please register.");
            } else {
                setErr(errorMessage);
            }
        }
      };
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      }

    return (
        <> 
        <div className="backGround h-screen w-screen flex flex-col items-center text-center">
        <Space className="m-12" direction="vertical" size={20}>
        <Card title="Login" style={{ width: 500 }}>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="m-4 flex flex-col items-center"
            >
                <div className="p-4 flex flex-col items-center">
            <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            htmlFor="email" 
            className="">
            <Input 
            type="text" 
            placeholder="Email"
            value={email}
            onChange={(e)=>
            setEmail(e.target.value)}
            />
          </Form.Item>
                </div>
                <div className="p-4 flex flex-col items-center">
                <Form.Item
                 label="Password"
                 name="password"
                 rules={[{ required: true, message: 'Please input your password!' }]}
                htmlFor="password" 
                className="">
        <Input.Password
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=>
                setPassword(e.target.value)}
                />
                </Form.Item>
                </div>
                
                <Button className="w-40 m-4" 
                type="primary" 
                htmlType="submit">

                    Submit</Button>
                {warningMessage()}
            </Form>
        </Card>
        </Space>
        </div>
        </> 
    )
}