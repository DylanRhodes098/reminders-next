// - - -  React imports - - - //
import React from 'react';
import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";

// - - -  Backend imports - - - //
import { login as loginUser} from "../services/auth";

// - - -  UI Components - - - //
import { Button, Checkbox, Form, Input, Card, Space } from 'antd';
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans} from "@tabler/icons-react";


// - - - Data imports - - - //
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
          await loginUser({
            email: values.email,
            password: values.password
          });
          navigate("/", { replace: true });
        } catch (error) {
          const errorMessage =
            error?.response?.data?.error ||
            error?.response?.data?.msg ||
            "login failed";
      
          if (
            errorMessage.includes("incorrect info") ||
            errorMessage.includes("failed Logging in")
          ) {
            setErr("User doesn't exist, please register.");
          } else {
            setErr(errorMessage);
          }
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
      };
      
      
    return (
        <> 
 <BackgroundGradientAnimation>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        
   
        <div className="backGround h-screen w-screen flex flex-col items-center text-center relative z-10">
        <Space className="m-12" direction="vertical" size={20}>
        <Card title="Login" style={{ width: 500 }}>
        <Form
  name="login"
  labelCol={{ span: 8 }}
  wrapperCol={{ span: 16 }}
  style={{ maxWidth: 600 }}
  onFinish={onFinish}
  autoComplete="off"
  className="m-4 flex flex-col items-center"
>
  <div className="p-4 flex flex-col items-center">
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
    >
      <Input placeholder="Email" />
    </Form.Item>
  </div>

  <div className="p-4 flex flex-col items-center">
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password placeholder="Password" />
    </Form.Item>
  </div>

  <Button
    className="w-40 m-4"
    type="primary"
    htmlType="submit"
  >
    Submit
  </Button>

  {warningMessage()}
</Form>

        </Card>
        </Space>
        </div>
        </motion.div>
        </BackgroundGradientAnimation>
        

     
        </> 
        
    )
}