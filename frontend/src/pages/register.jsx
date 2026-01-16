import { useState } from "react";
import { register as registerUser } from "../services/auth.js";
import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { Card, Space } from 'antd';
import "../styles/LoginRegister.css"

export default function Register() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await registerUser({ full_name, email, password });
      navigate("/login", { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.error || "Registration failed");
    }
  }

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
      await registerUser({ 
        full_name: values.full_name, 
        email: values.email, 
        password: values.password 
      });
      navigate("/login", { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.error || "Registration failed");
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  return (
    <div className="backGround h-screen w-screen flex flex-col items-center text-center">
           <Space className="m-12" direction="vertical" size={20}>
           <Card title="Login" style={{ width: 500 }}>

      {/* Error message */}
      {err ? (
        <div
          role="alert"
          aria-live="polite"
          className=""
        >
          {err}
        </div>
      ) : null}

      <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
      className="m-4 flex flex-col items-center">
        <div className="p-4 flex flex-col items-center">
          <Form.Item
          label="Username"
          name="full_name"
          rules={[{ required: true, message: 'Please input your username!' }]}
          htmlFor="full_name" 
          className="">
          <Input
            id="full_name"
            placeholder="Full Name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            className=""
          />
          </Form.Item>
        </div>

        <div className="p-4 flex flex-col items-center">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          htmlFor="email" 
          className="">
          <Input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className=""
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
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className=""
          />
           </Form.Item>
        </div>

        <Button
         type="primary" 
         htmlType="submit"
          className="w-40 m-4"
          disabled={!full_name || !email || !password}
        >
          Register
        </Button>
      </Form>

      <p className="">
        Have an account?{" "}
        <Link to="/login" className="">
          Login
        </Link>
      </p>
         </Card>
              </Space>
    </div>
    
  )
}