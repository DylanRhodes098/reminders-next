// - - -  React imports - - - //
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import React from 'react';
import { useParams } from "react-router-dom";

// - - -  Backend imports - - - //
import { listReminders } from "../services/reminders";
import { createReminders } from "../services/reminders";
import { getSubListById } from "../services/subList";

// - - -  UI Components - - - //
import { DatePicker, Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex} from 'antd';
import { useResponsive } from 'antd-style';

// - - -  Data imports - - - //
import "../styles/SideNav.css";
import { RemindersData } from "../data/remindersObject";
import { RemindersDropDown } from "../data/remindersDropDown";

export default function Reminders () {

    // - - -  GlobalUses - - - //
    const navigate = useNavigate();
    const { xxl } = useResponsive();
    const { subListId } = useParams();
    // <- useParams reads the current URL, allowing you to identify what data should be displayed. 

    // <- Example =  if (!subListId) return; setErr("");

    // <- try { const subListData = await getSubListById(subListId); setSubList(subListData); } 

    // <- catch (error) { setErr(error?.response?.data?.error || "Failed to load data"); setSubList(null); }. 
    
    const { RangePicker } = DatePicker;
    // <- Ants DatePicker Component 

    // <- Example = </Form.Item> <Form.Item label="Date"> <DatePicker /> </Form.Item>. 

    const { TextArea } = Input;
    // <- Ants Input Component. 

    // <- Example = <TextArea rows={4} />. 


    // - - -  UseStates - - - //
    const [err, setErr] = useState("");
    const [reminders, setReminders] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [subList, setSubList] = useState(null); 


    // - - -  Modal - - - //
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



  // - - -  Form - - - //
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



  // - - -  onClick Functions - - - //
  const onClick = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      navigate(path); // 👈 navigate
    }
  };

  // - - -  Backend Functions - - - //

  // GET Data //
     function buildReminderItems(reminders) {

      const remindersArray = Array.isArray(reminders) ? reminders : [];
      return remindersArray.map(reminder => ({
        key: reminder.id,
        label: reminder.note,
      }));
    }

     // Other //
     useEffect(() => {
      async function fetchData() {
        if (!subListId) return;
        
        setErr("");
        try {
          const subListData = await getSubListById(subListId);
       
          setSubList(subListData);
      
          const remindersData = await listReminders(subListId);
         
          const remindersArray = Array.isArray(remindersData) ? remindersData : [];
          setReminders(remindersArray);

        } catch (error) {
          console.error("Error fetching data:", error);
          setErr(error?.response?.data?.error || "Failed to load data");
          setSubList(null);
          setReminders([]);
        }
      }
    
      fetchData();
    }, [subListId]);

  if (err) {
    return (
      <div className="">
        <h1 className="mb-4 font-bold text-xl">Error</h1>
        <p style={{ color: "crimson" }}>{err}</p>
      </div>
    );
  }


  
     return (
        <>
        <div className=""> 
        <h1 className="mb-4 font-bold text-xl">
        {subList ? subList.name : "Loading..."}
        </h1>
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
