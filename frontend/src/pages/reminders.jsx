// - - -  React imports - - - //
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useParams } from "react-router-dom";

// - - -  Backend imports - - - //
import  { listReminders, createReminders, deleteReminders } from "../services/reminders";
import { getSubListById } from "../services/subList";
import { listReminderFolder, createReminderFolder,deleteReminderFolder } from "../services/reminderFolder";

// - - -  UI Components - - - //
import { DatePicker, Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex, Divider} from 'antd';
import { useResponsive } from 'antd-style';
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

// - - -  Data imports - - - //
import "../styles/SideNav.css";
import "../styles/listStyle.css";
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
    const [reminderFolders, setReminderFolders] = useState([]);
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [creatingReminderForFolder, setCreatingReminderForFolder] = useState(null);
    const [newReminderText, setNewReminderText] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const enterPressedRef = useRef(false);


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

       // <- Displays GET data according to Ants Menu Component -> // 
       function buildMenuItems(folders, reminders) {
        return folders.map(folder => {
          const folderReminders = reminders.filter(
            r => r.reminderFolderId === folder.id
          );
      
          const isCreating = creatingReminderForFolder === folder.id;
      
          const children = [
            ...folderReminders.map(reminder => ({
              key: reminder.id,
              label: (
                <div className="flex-between">
                  <span>{reminder.note}</span>
                  <DeleteOutlined
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReminder(reminder.id);
                    }}
                  />
                </div>
              )
            })),
      
            ...(isCreating ? [] : [{
              key: `add-${folder.id}`,
              label: <PlusCircleOutlined className="plus-icon" />,
              onClick: ({ domEvent }) => {
                domEvent.stopPropagation();
                setOpenKeys(prev => [...new Set([...prev, folder.id])]);
                setCreatingReminderForFolder(folder.id);
                setNewReminderText("");
                enterPressedRef.current = false;
              }
            }]),
      
            ...(isCreating ? [{
              key: `create-${folder.id}`,
              label: (
                <Input
                  placeholder="New reminder"
                  bordered={false}
                  autoFocus
                  value={newReminderText}
                  onChange={e => setNewReminderText(e.target.value)}
                  onPressEnter={() => handleCreateReminder(folder.id)}
                  onBlur={() => {
                    setTimeout(() => {
                      if (!enterPressedRef.current) {
                        handleCancelCreateReminder();
                      }
                    }, 0);
                  }}
                  onKeyDown={e => {
                    if (e.key !== "Enter") enterPressedRef.current = false;
                  }}
                  onClick={e => e.stopPropagation()}
                />
              )
            }] : [])
          ];
      
          return {
            key: folder.id,
            label: (
              <div className="flex-between">
                <span>{folder.name}</span>
                <DeleteOutlined
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteReminderFolder(folder.id);
                  }}
                />
              </div>
            ),
            children
          };
        });
      }      

    // PUT Data //

    // <- Create Folder ->//
    const handleCreateReminderFolder = async () => {
      if (!newFolderName.trim()) return handleCancelCreateFolder();
      if (!subListId) {
        setErr("Missing subListId");
        return;
      }
    
      try {
        const data = await createReminderFolder({
          name: newFolderName.trim(),
          subListId: subListId,
        });
    
        setReminderFolders(prev => [...prev, data]);
        handleCancelCreateFolder();
      } catch (e) {
        console.error(e);
        setErr("Failed creating reminder folder");
      }
    };
    
    
    const handleCancelCreateFolder = () => {
      setCreatingFolder(false);
      setNewFolderName("");
      enterPressedRef.current = false;
    };

    // <- Create Reminder ->//
    const handleCreateReminder = async (folderId) => {
      if (!newReminderText.trim()) return handleCancelCreateReminder();
      if (!subListId) {
        setErr("Missing subListId");
        return;
      }
    
      try {
        const data = await createReminders({
          note: newReminderText.trim(),
          reminderFolderId: folderId,
          subListId: subListId,
        });
    
        setReminders(prev => [...prev, data]);
        handleCancelCreateReminder();
      } catch (e) {
        console.error(e);
        setErr("Failed creating reminder");
      }
    };
    
    const handleCancelCreateReminder = () => {
      setCreatingReminderForFolder(null);
      setNewReminderText("");
      enterPressedRef.current = false;
    };

    // DELETE Data //

    // <- Delete Folder ->//
    const handleDeleteReminderFolder = async (id) => {
      await deleteReminderFolder(id);
    
      setReminderFolders(prev => prev.filter(f => f.id !== id));
      setReminders(prev => prev.filter(r => r.reminderFolderId !== id));
    };
    
    const handleDeleteReminder = async (id) => {
      await deleteReminders(id);
      setReminders(prev => prev.filter(r => r.id !== id));
    };

     // Other //
     useEffect(() => {
      if (!subListId) return;
    
      (async () => {
        try {
          setErr("");
    
          const subListData = await getSubListById(subListId);
          setSubList(subListData);
    
          const folders = await listReminderFolder(subListId);
          const reminders = await listReminders(subListId);
    
          setReminderFolders(Array.isArray(folders) ? folders : []);
          setReminders(Array.isArray(reminders) ? reminders : []);
    
        } catch (e) {
          console.error(e);
          setErr("Failed loading reminders");
        }
      })();
    }, [subListId]);
  


     return (
        <>
        <div className=""> 
        <h1 className="mb-4 font-bold text-xl">
        {subList ? subList.name : "Loading..."}
        </h1>
        <Divider />
        <Menu
  mode="inline"
  openKeys={openKeys}
  onOpenChange={setOpenKeys}
  items={[
    ...buildMenuItems(reminderFolders, reminders),
    ...(creatingFolder ? [{
      key: "create-folder",
      label: (
        <Input
          placeholder="New folder"
          bordered={false}
          autoFocus
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
          onPressEnter={(e) => {
            e.preventDefault();      // ⛔ stop form submit / routing
            e.stopPropagation();     // ⛔ stop AntD Menu keyboard handling
            enterPressedRef.current = true;
            handleCreateReminderFolder();
          }}
          onBlur={() => {
            setTimeout(() => {
              if (!enterPressedRef.current) {
                handleCancelCreateFolder();
              }
            }, 0);
          }}
          onClick={e => e.stopPropagation()}
        />
      )
    }] : [])
  ]}
/>
  <PlusCircleOutlined
  onClick={() => {
    setCreatingFolder(true);
    setNewFolderName("");
    enterPressedRef.current = false;
  }}
  className="plus-icon mt-6"
/>
{err && <p className="text-red-500 mb-2">{err}</p>}

                </div>
        </>
     )

}
