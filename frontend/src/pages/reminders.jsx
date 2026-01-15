import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import React from 'react';
import { useParams } from "react-router-dom";

// Backend imports //
import { listReminders } from "../services/reminders";
import { createReminders } from "../services/reminders";

// UI Components //
import { DatePicker, Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex} from 'antd';
import { useResponsive } from 'antd-style';

// Data imports`//
import "../styles/SideNav.css";
import { RemindersData } from "../data/remindersObject";
import { RemindersDropDown } from "../data/remindersDropDown";

export default function Reminders () {

    // GlobalUses //
    const navigate = useNavigate();
    const { xxl } = useResponsive();
    const { subListId } = useParams();
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    // UseStates //
    const [err, setErr] = useState("");
    const [folder, setFolder] = useState([]);
    const [reminders, setReminders] = useState([]); 
    const [form, setForm] = useState(""); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);



    // Modal //
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMenuClick = ({ key }) => {
    setModalType(key);
    showModal(); // your existing function
  };



  // Form //
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



  // onClick Functions //

  const onClickAdd = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      window.location.href = path; // 👈 navigate
    }
  };



  // Backend Functions //
  


  // Data render function //
     function buildReminderItems(reminders) {
      return reminders.map(reminder => ({
        key: reminder.id,
        label: reminder.note,
      }));
    }

     // Other //
     useEffect(() => {
      async function fetchReminders() {
        const data = await listReminders(subListId);
        setReminders(data);
      }
    
      if (subListId) fetchReminders();
    }, [subListId]);


  if (err) return <p>{err}</p>;


     function warningMessage () {
        if (!err) {
            return null;
        } else {
            return <p style={{ color: "crimson" }}>{err}</p>
        }
     }

     return (
        <>
        <div className=""> 
        <h1 className="mb-4 font-bold text-xl">NAME OF SUBLIST</h1>
        <Menu
    className=""
      onClick={onClick}
      style={{ width: '100%' }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={buildReminderItems(reminders)}
    />
   <Dropdown
  menu={{
    items: RemindersDropDown,
    onClick: handleMenuClick,
  }}
>
  <Button className="mt-8" type="primary" variant="text">
    Add
  </Button>
</Dropdown>

<Modal
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  {modalType === 'reminder' && <div>
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    layout="vertical"
  >
    <Form.Item
      label="Reminder"
      name="reminder"
      rules={[{ required: true, message: 'Please input the reminder!' }]}
    >
        <TextArea rows={4} />
    </Form.Item>
    <Form.Item label="Date">
          <DatePicker />
        </Form.Item>
    </Form>
    </div>}
</Modal>
   
                </div>
        </>
     )

}
