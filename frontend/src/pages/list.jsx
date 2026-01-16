
// - - -  React imports - - - //
import {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import React from 'react';

// - - -  Backend imports - - - //
import { listList } from "../services/list";
import { createList } from "../services/list";
import { listSubList, deleteSubList } from "../services/subList";
import { createSubList } from "../services/subList";
import { listFolder, deleteFolder } from "../services/folder";
import { createFolder as createFolderApi } from "../services/folder";

// - - -  UI Components - - - //
import { Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex} from 'antd';
import { useResponsive } from 'antd-style';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

// - - -  Data imports - - - //
import { SideNavRoutes } from '../data/mainListObjects';
import "../styles/SideNav.css";



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

    const [creatingSubListForFolder, setCreatingSubListForFolder] = useState(null);
    // <- Tracks which folder is in "create sublist" mode

    const [newSubListName, setNewSubListName] = useState("");
    // <- Stores the name of the new sublist being created

    const [openKeys, setOpenKeys] = useState([]);
    // <- Tracks which folders are open in the menu

    const enterPressedRef = useRef(false);
    // <- Tracks if Enter was pressed to prevent canceling on blur after Enter

    const { xxl } = useResponsive();

    const [creatingFolder, setCreatingFolder] = useState(false);
    // <- Tracks if a folder is being created 
    
    const [newFolderName, setNewFolderName] = useState("");
    // <- Stores the name of the new folder being created 


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



  // - - -  Form - - - //
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



  // - - -  onClick Functions - - - //
  const onClickHome = (e) => {
    // Cancel sublist creation if clicking on a menu item (not the input or add button)
    if (
      creatingSubListForFolder &&
      !e.key.startsWith('create-') &&
      !e.key.startsWith('add-sublist-') &&
      e.key !== creatingSubListForFolder
    ) {
      handleCancelSubList();
    }

    const path = routesByKey[e.key];

    if (path) {
      navigate(path); // 👈 navigate
    }
  };

  const handleCreateFolderClick = () => {
    setCreatingFolder(true);
    setNewFolderName("");
    enterPressedRef.current = false;
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
    return folders.map(folder => {
      const folderSubLists = subList.filter(sub => sub.folderId === folder.id);
      const isCreating = creatingSubListForFolder === folder.id;
      
      const children = [
        ...folderSubLists.map(sub => ({
          key: sub.id,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{sub.name}</span>
        
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSubList(sub.id);
                }}
                className="cursor-pointer transition-colors duration-200 hover:text-[#1890ff]"
                style={{ color: "#ff4d4f" }}
              />
            </div>
          ),
          onClick: () => navigate(`/sublist/${sub.id}`),
        })),
        // Add "+ Add sublist" trigger button below the last sublist
        ...(isCreating ? [] : [{
          key: `add-sublist-${folder.id}`,
          label: (<PlusCircleOutlined className="text-black cursor-pointer transition-colors duration-200 hover:text-[#1890ff]" />),
          onClick: ({ domEvent }) => {
            if (domEvent) {
              domEvent.stopPropagation();
            }
            console.log("folder.id =", folder.id, typeof folder.id);
            // Open the folder if it's not already open
            setOpenKeys(prev =>
              prev.includes(folder.id) ? prev : [...prev, folder.id]
            );
            
            setCreatingSubListForFolder(folder.id);
            setNewSubListName("");
            enterPressedRef.current = false;
          },
          style: { color: '#1890ff', cursor: "pointer" },
          
        }]),

        // Add input field for creating new sublist if this folder is in create mode
        ...(isCreating ? [{
          key: `create-${folder.id}`,
          label: (
            <Input 
              placeholder="New" 
              bordered={false}
              value={newSubListName}
              onChange={(e) => setNewSubListName(e.target.value)}
              onPressEnter={async (e) => {
                e.stopPropagation();
                enterPressedRef.current = true;
                if (newSubListName.trim()) {
                  await handleCreateSubList(folder.id);
                } else {
                  handleCancelSubList();
                }
              }}
              onBlur={(e) => {
                // Use setTimeout to allow onPressEnter to set the ref first
                setTimeout(() => {
                  // Only cancel if Enter was not pressed
                  if (!enterPressedRef.current) {
                    handleCancelSubList();
                  }
                }, 0);
              }}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                // Reset ref if user presses any key other than Enter
                if (e.key !== 'Enter') {
                  enterPressedRef.current = false;
                }
              }}
            />
          ),
        }] : [])
      ];

      return {
        key: String(folder.id),
        label: (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{folder.name}</span>
      
            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFolder(folder.id);
              }}
              className="cursor-pointer transition-colors duration-200 hover:text-[#1890ff]"
            />
          </div>
        ),
        children: children.length > 0 ? children : undefined,
      };
    });
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

  // <- POSTS new sublist -> //
    const handleCreateSubList = async (folderId) => {
      setErr("");
      if (!newSubListName.trim()) {
        handleCancelSubList();
        return;
      }
      if (!folderId) {
        setErr("Folder ID is missing");
        handleCancelSubList();
        return;
      }
      try {
        const payload = { 
          name: newSubListName.trim(), 
          folderId: folderId 
        };
        console.log("Creating sublist with payload:", payload);
        const data = await createSubList(payload);
    
        setSubList(current => [...current, data]);
        setCreatingSubListForFolder(null);
        setNewSubListName("");
        enterPressedRef.current = false;
      } catch (error) {
        console.error("Error creating sublist:", error);
        console.error("Error response:", error?.response?.data);
        const errorMessage = error?.response?.data?.error || error?.response?.data?.message || "failed creating sublist";
        const validationDetails = error?.response?.data?.details || error?.response?.data?.message;
        if (validationDetails) {
          console.error("Validation details:", validationDetails);
        }
        setErr(errorMessage);
        enterPressedRef.current = false;
      }
    };

    const handleCancelSubList = () => {
      setCreatingSubListForFolder(null);
      setNewSubListName("");
      enterPressedRef.current = false;
    };

    const handleCreateFolderInline = async () => {
      setErr("");
    
      if (!newFolderName.trim()) {
        handleCancelCreateFolder();
        return;
      }
    
      try {
        const data = await createFolderApi({ name: newFolderName.trim() });
    
        setFolder(current => [...current, data]);
        setCreatingFolder(false);
        setNewFolderName("");
        enterPressedRef.current = false;
      } catch (error) {
        console.error("Failed creating folder:", error);
        setErr(
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed creating folder"
        );
        enterPressedRef.current = false;
      }
    };

    const handleCancelCreateFolder = () => {
      setCreatingFolder(false);
      setNewFolderName("");
      enterPressedRef.current = false;
    };
    

    // DELETE Data //

    // <- DELETEs sublist -> //
    const handleDeleteSubList = async (subListId) => {
      setErr("");
    
      try {
        await deleteSubList(subListId);
    
        // Remove sublist from state
        setSubList(current =>
          current.filter(sub => sub.id !== subListId)
        );
    
        // Optional: navigate away if user is on this sublist
        navigate("/");
    
      } catch (error) {
        console.error("Failed deleting sublist:", error);
        setErr(
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed deleting sublist"
        );
      }
    };
    
    // <- DELETEs folder -> //
    const handleDeleteFolder = async (folderId) => {
      setErr("");
    
      try {
        await deleteFolder(folderId);
    
        // Remove folder
        setFolder(current =>
          current.filter(folder => folder.id !== folderId)
        );
    
        // Remove all sublists under this folder
        setSubList(current =>
          current.filter(sub => sub.folderId !== folderId)
        );
    
        // Close menu section if open
        setOpenKeys(current =>
          current.filter(key => key !== folderId)
        );
    
        navigate("/");
    
      } catch (error) {
        console.error("Failed deleting folder:", error);
        setErr(
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed deleting folder"
        );
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

    // <- useEffect renders data when the page first loads. 

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
      key={`menu-${creatingSubListForFolder || 'none'}`}
      onClick={onClickHome}
      style={{ width: '100%' }}
      defaultSelectedKeys={['1']}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      mode="inline"
      items={[
        ...buildMenuItems(folder, subList),
        ...(creatingFolder
          ? [{
              key: "create-folder",
              label: (
                <Input
                  placeholder="New folder"
                  bordered={false}
                  value={newFolderName}
                  autoFocus
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onPressEnter={async (e) => {
                    e.stopPropagation();
                    enterPressedRef.current = true;
                    await handleCreateFolderInline();
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      if (!enterPressedRef.current) {
                        handleCancelCreateFolder();
                      }
                    }, 0);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") {
                      enterPressedRef.current = false;
                    }
                  }}
                />
              ),
            }]
          : [])
      ]}
      
    />

<PlusCircleOutlined
  style={{ fontSize: 22, marginTop: 24 }}
  onClick={handleCreateFolderClick}
  className="text-black cursor-pointer transition-colors duration-200 hover:text-[#1890ff] hover:bg-gray-100 rounded-md p-2"
/>


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
  <DeleteOutlined className="cursor-pointer transition-colors duration-200 hover:text-[#1890ff]" />
</Form.Item>
    </Form>
    </div>}
    <DeleteOutlined className="cursor-pointer transition-colors duration-200 hover:text-[#1890ff]" />
</Modal>
   
                </div>
        </>
     )

}
