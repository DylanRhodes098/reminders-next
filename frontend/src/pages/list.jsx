
// - - -  React imports - - - //
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import React from 'react';

// - - -  Backend imports - - - //
import { listList } from "../services/list";
import { createList } from "../services/list";
import { listSubList } from "../services/subList";
import { createSubList } from "../services/subList";
import { listFolder } from "../services/folder";
import { createFolder as createFolderApi } from "../services/folder";

// - - -  UI Components - - - //
import { Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex} from 'antd';
import { useResponsive } from 'antd-style';

// - - -  Data imports - - - //
import { SideNavRoutes } from '../data/mainListObjects';
import "../styles/SideNav.css";
import { MainListDropDown } from "../data/mainListDropDown";

export default function List () {



    // - - -  GlobalUses - - - //
    const navigate = useNavigate();
    // <- useNavigate changes the url without a full window refresh. 

    // <- It's an upgrdae to conventional window.location.href.

    // <- Syntax = onClick: () => navigate("path"). 

    // <- Example = onClick: () => navigate(`/sublist/${sub.id}`). 

    // <- Example = navigate("/login", { replace: true }); <- Stops users from pressing back. 

    const routesByKey = SideNavRoutes;
    // <- routesByKey is an object that contains the home/base route.

    // <- Syntax = const function = (x) => { const path = routesByKey[x.key]}. 
    
    const [folderForm] = Form.useForm();
    // <- const [form] = Form.useForm();

    // <- An Ants useState for forms which gives you options to : (Folder and List forms)

    // <- form.resetFields(); = Resets all fields back to their initial values.

    // <- form.getFieldValue(“name”); = Retrieves the value of a specific field. 

    // <- form.setFieldValue("name", "My Folder"); = Sets one field’s value. 

    // <- form.setFieldsValue(object) ← form.setFieldsValue ({ "name" : "My Folder", "Place" : "Upminster"}) = Sets multiple field's value. 

    // <- form.submit(); = Triggers a submit, used on onFinish functions. 



    // - - -  UseStates - - - //

    // <- useState allows data to change wihtout a full page refrsh.

    // <- [x, y] = useState([]) x is the old data, y is the new data, [] initializes/starts the data type for x.  

    const [err, setErr] = useState("");
    // <- setErr identifies errors and respponds with a string. .

    const [folder, setFolder] = useState([]);
    // <- Starts folder as an array, and gives you the ability to update the folder array using setFolder.

    // <- Example =  const data = await listFolder(); setFolder(data);. 

    const [list, setList] = useState([]); 
    // <- Starts list as an array, and gives you the ability to update the list array using setList.

    // <- Example =  const data = await listList(); setList(data);. 

    const [subList, setSubList] = useState([]); 
    // <- Starts subList as an array, and gives you the ability to update the subList array using setSubList.

    // <- Example =  const data = await listSubList(); setSubList(data);. 

    const [isModalOpen, setIsModalOpen] = useState(false);
    // <- Starts isModalOpen as a boolean, and gives you the ability to update the isModalOpen boolean using setIsModalOpen.

    // <- Example =  setIsModalOpen(true);. 

    const [modalType, setModalType] = useState(null);
    // <- Starts modalType as nothing, giving you the option to update as anything you like. 

    // <- Example =  modalType === 'folder'. 


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
  const onClickHome = (e) => {
    const path = routesByKey[e.key];

    if (path) {
      navigate(path); // 👈 navigate
    }
  };



  // - - -  Backend Functions - - - //

  // GET Data //
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

   // <- Displays GET data according to Ants Menu Component -> // 
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

   // POST Data //

  // <- POSTS new folder according to Ants Form Component -> // 
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

     // - - -  Other - - - //
     useEffect (() => {
        (async () => {
            await retrieveList();
            await retrieveFolder();
            await retrieveSubList();
        })(); 
    }, []);

    // <- useEffect renders data when thepage first loads. 

    // <- The [] stops infinite rendering. 

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
      onClick={onClickHome}
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
