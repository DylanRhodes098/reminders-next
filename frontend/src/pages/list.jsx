import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import React from 'react';

// Backend imports //
import { listList } from "../services/list";
import { createList } from "../services/list";
import { listSubList } from "../services/subList";
import { createSubList } from "../services/subList";
import { listFolder } from "../services/folder";
import { createFolder as createFolderApi } from "../services/folder";

// UI Components //
import { Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex} from 'antd';
import { useResponsive } from 'antd-style';

// Data imports`//
import { SideNavRoutes, MainListData} from '../data/mainListObjects';
import "../styles/SideNav.css";
import { MainListDropDown } from "../data/mainListDropDown";

export default function List () {



    // GlobalUses //
    const navigate = useNavigate();
    const routesByKey = SideNavRoutes;
    const { xxl } = useResponsive();
    const [folderForm] = Form.useForm();



    // UseStates //
    const [err, setErr] = useState("");
    const [folder, setFolder] = useState([]);
    const [list, setList] = useState([]); 
    const [subList, setSubList] = useState([]); 
    const [form, setForm] = useState(""); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [menuItems, setMenuItems] = useState([]);



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
  const onClick = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      window.location.href = path; // 👈 navigate
    }
  };

  const onClickAdd = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      window.location.href = path; // 👈 navigate
    }
  };



  // Backend Functions //
     async function retrieveList () {
        setErr("");
        try {
            const data = await listList();
            setList (data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retriveing" );
        }
     }

     async function retrieveFolder () {
        setErr("");
        try{
            const data = await listFolder();
            console.log("FOLDER API RESPONSE:", data);
            // Folder data should populate the `folder` state, not `list`
            setFolder(data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retrieving folders");
        }
     }

     async function retrieveSubList () {
      setErr("");
      try{
          const data = await listSubList();
          // Folder data should populate the `folder` state, not `list`
          setSubList(data);
      } catch (error) {
          setErr(error?.response?.data?.error || "failed retrieving folders");
      }
   }

     async function handleCreateFolder(e, name) {
        e.preventDefault();
        setErr("");
        try {
            const payload = { name };
            const data = await createFolderApi(payload);
            // Append the new folder to the existing folder list
            setFolder(current => [...current, data]);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed creating folder");
        }
     }

     const onFinishCreateFolder = async (values) => {
      setErr("");
      try {
        const data = await createFolderApi({ name: values.name });
    
        setFolder(current => [...current, data]);
    
        folderForm.resetFields();   // ✅ reset inputs
        setIsModalOpen(false);      // ✅ close modal
      } catch (error) {
        setErr(error?.response?.data?.error || "failed creating folder");
      }
    };

        // Data render function //
     function buildMenuItems(folders, subList) {
      return folders.map(folder => ({
        key: folder.id,
        label: folder.name,

        children: subList
          .filter(sub => sub.folderId === folder.id)
          .map(sub => ({
            key: sub.id,
            label: sub.name,
            onClick: () => navigate(`/sublist/${sub.id}`),
          })),
      }));
    }

     // Other //
     useEffect (() => {
        (async () => {
            await retrieveList();
            await retrieveFolder();
            await retrieveSubList();
        })(); 
    }, []);


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
        <h1 className="mb-4 font-bold text-xl">List</h1>
        <Menu
    className=""
      onClick={onClick}
      style={{ width: '100%' }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={buildMenuItems(folder, subList, navigate)}
    />
   <Dropdown
  menu={{
    items: MainListDropDown,
    onClick: handleMenuClick,
  }}
>
  <Button className="mt-8" type="primary" variant="text">
    Add
  </Button>
</Dropdown>

<Modal
  open={isModalOpen}
  footer={null}
  onCancel={handleCancel}
>
  {modalType === 'folder' && <div>
    <Form
    name="basic"
    form={folderForm}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinishCreateFolder}
    onFinishFailed={onFinishFailed}
    layout="vertical"
    autoComplete="off"
  >
    <Form.Item
      label="Folder Name"
     name="name"
      rules={[{ required: true, message: 'Please input the name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item>
  <Button type="primary" htmlType="submit">
    Create Folder
  </Button>
</Form.Item>
    </Form>
    </div>}
  {modalType === 'list' && <div>
    <Form
    name="basic"
    form={folderForm}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    layout="vertical"
    autoComplete="off"
  >
    <Form.Item
      label="List Name"
      name="name"
      rules={[{ required: true, message: 'Please input the name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item>
  <Button type="primary" htmlType="submit">
    Create List
  </Button>
</Form.Item>
    </Form>
    </div>}
</Modal>
   
                </div>
        </>
     )

}
