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
import { DatePicker, Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex, Divider, TimePicker} from 'antd';
import { useResponsive } from 'antd-style';
import { PlusCircleOutlined, DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


// - - -  Data imports - - - //
import "../styles/SideNav.css";
import "../styles/listStyle.css";
import { RemindersDropDown } from "../data/remindersDropDown";



export default function Reminders () {

    // - - -  GlobalUses - - - //
    const navigate = useNavigate();
 
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

    const createRowRef = useRef(null);

    const enterPressedRef = useRef(false);

    const ignoreBlurRef = useRef(false);

    const reminderInputRef = useRef(null);

    const editInputRef = useRef(null);


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
    const [newReminderDate, setNewReminderDate] = useState(null);
    const [newReminderTime, setNewReminderTime] = useState(null);
    const [openKeys, setOpenKeys] = useState([]);
    const [dateOpen, setDateOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [editingReminderId, setEditingReminderId] = useState(null);
const [editReminderText, setEditReminderText] = useState("");
const [editReminderDate, setEditReminderDate] = useState(null);
const [editReminderTime, setEditReminderTime] = useState(null);
const [editDateOpen, setEditDateOpen] = useState(false);
const [editTimeOpen, setEditTimeOpen] = useState(false);
  


  // - - -  onClick Functions - - - //
  const onClick = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      navigate(path); // 👈 navigate
    }
  };

  const armIgnoreBlur = () => {
    ignoreBlurRef.current = true;
    // release after the click/open sequence settles
    setTimeout(() => {
      ignoreBlurRef.current = false;
    }, 200);
  };

  const resetCreateReminderRow = (folderId) => {
    setCreatingReminderForFolder(folderId); // keep it open
    setNewReminderText("");
    setNewReminderDate(null);
    setNewReminderTime(null);
    setDateOpen(false);
    setTimeOpen(false);
    enterPressedRef.current = false;
  
    // refocus after state updates
    setTimeout(() => {
      reminderInputRef.current?.focus?.();
    }, 0);
  };

  const startEditingReminder = (reminder) => {
    setEditingReminderId(reminder.id);
    setEditReminderText(reminder.note || "");
    setEditReminderDate(reminder.date_of_reminder ? dayjs(reminder.date_of_reminder) : null);
    setEditReminderTime(reminder.date_of_reminder ? dayjs(reminder.date_of_reminder) : null);
    setEditDateOpen(false);
    setEditTimeOpen(false);
  
    setTimeout(() => editInputRef.current?.focus?.(), 0);
  };
  
  const cancelEditingReminder = () => {
    setEditingReminderId(null);
    setEditReminderText("");
    setEditReminderDate(null);
    setEditReminderTime(null);
    setEditDateOpen(false);
    setEditTimeOpen(false);
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{reminder.note}</span>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                  <span style={{ padding: '0 10px', color: "#9ca3af" }}>
                  {dayjs(reminder.date_of_reminder).format("DD/MM/YYYY")}</span>
                  <span style={{ padding: '0 10px', color: "#9ca3af" }}>{dayjs(reminder.date_of_reminder).format("HH:mm")}</span>
                  <InfoCircleOutlined className="info-icon" />
                  <DeleteOutlined
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReminder(reminder.id);
                    }}
                    style={{ color: "#ff4d4f" }}
                  />
                  </div>
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
                setNewReminderDate(null);
                setNewReminderTime(null);
                enterPressedRef.current = false;
              }
            }]),
      
            ...(isCreating ? [{
              key: `create-${folder.id}`,
              label: (
                <div ref={createRowRef} style={{ width: "100%", padding: "8px 0" }}>
                  <Input
               ref={reminderInputRef}
                    placeholder="New reminder"
                    bordered={false}
                    autoFocus
                    value={newReminderText}
                    onChange={e => setNewReminderText(e.target.value)}
                    onPressEnter={async (e) => {
                      if (e && e.stopPropagation) {
                        e.stopPropagation();
                      }
                      enterPressedRef.current = true;
                      if (newReminderText.trim()) {
                        await handleCreateReminder(folder.id);
                      } else {
                        handleCancelCreateReminder();
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        if (ignoreBlurRef.current) return;
                        if (dateOpen || timeOpen) return;
                        if (!enterPressedRef.current) handleCancelCreateReminder();
                      }, 0);
                    }}
                    onKeyDown={e => {
                      if (e.key !== "Enter") {
                        enterPressedRef.current = false;
                      } else {
                        enterPressedRef.current = true;
                      }
                    }}
                    onClick={e => {
                      if (e && e.stopPropagation) {
                        e.stopPropagation();
                      }
                    }}
                  />
                  <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                  <DatePicker
  placeholder="Date"
  value={newReminderDate}
  onChange={setNewReminderDate}
  getPopupContainer={() => document.body}
  open={dateOpen}
  onOpenChange={(open) => {
    setDateOpen(open);
    if (open) armIgnoreBlur();
  }}
  onMouseDown={(e) => {
    e.preventDefault();     // keep Input from losing focus immediately
    e.stopPropagation();    // keep Menu from treating it like a menu click
    armIgnoreBlur();        // IMPORTANT: prevents your blur cancel
    setDateOpen(true);      // open explicitly
  }}
  style={{ width: 120 }}
  // updated styling API below
  classNames={{ popup: { root: "reminder-picker-popup" } }}
/>

<TimePicker
  placeholder="Time"
  value={newReminderTime}
  onChange={setNewReminderTime}
  format="HH:mm"
  getPopupContainer={() => document.body}
  open={timeOpen}
  onOpenChange={(open) => {
    setTimeOpen(open);
    if (open) armIgnoreBlur();
  }}
  onMouseDown={(e) => {
    e.preventDefault();
    e.stopPropagation();
    armIgnoreBlur();
    setTimeOpen(true);
  }}
  style={{ width: 100 }}
  classNames={{ popup: { root: "reminder-picker-popup" } }}
/>

                  </div>
                </div>
              )
            }] : [])
          ];
          return {
            key: folder.id,
            label: (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        console.error("Error creating reminder folder:", e);
        console.error("Error response:", e?.response?.data);
        // Check if it's an auth error
        if (e?.response?.status === 401 || e?.response?.status === 403) {
          // Let the interceptor handle the redirect
          return;
        }
        setErr(e?.response?.data?.error || e?.response?.data?.message || "Failed creating reminder folder");
      }
    };
    
    
    const handleCancelCreateFolder = () => {
      setCreatingFolder(false);
      setNewFolderName("");
      enterPressedRef.current = false;
    };

    // <- Create Reminder ->//
    const handleCreateReminder = async (folderId) => {
      if (!newReminderText.trim()) {
        handleCancelCreateReminder();
        return;
      }
      if (!subListId) {
        setErr("Missing subListId");
        return;
      }
    
      try {
        // Combine date and time if both are provided
        let dateOfReminder = null;
        if (newReminderDate) {
          if (newReminderTime) {
            // Combine date and time
            const date = newReminderDate.toDate();
            const time = newReminderTime.toDate();
            date.setHours(time.getHours());
            date.setMinutes(time.getMinutes());
            date.setSeconds(time.getSeconds());
            dateOfReminder = date.toISOString();
          } else {
            // Just date
            dateOfReminder = newReminderDate.toDate().toISOString();
          }
        } else if (newReminderTime) {
          // Just time - use today's date
          const today = dayjs();
          const time = newReminderTime.toDate();
          const combined = today.hour(time.getHours()).minute(time.getMinutes()).second(time.getSeconds());
          dateOfReminder = combined.toDate().toISOString();
        }

        const payload = {
          note: newReminderText.trim(),
          reminderFolderId: folderId,
          subListId: subListId,
        };

        if (dateOfReminder) {
          payload.date_of_reminder = dateOfReminder;
        }

        console.log("Creating reminder with payload:", payload);
        const data = await createReminders(payload);
        console.log("Reminder created successfully:", data);
    
        // Ensure we have valid data before updating state
        if (data && data.id) {
          setReminders(prev => {
            const updated = [...prev, data];
            console.log("Updated reminders state:", updated);
            return updated;
          });
          resetCreateReminderRow(folderId); // 👈 ready to create another
        } else {
          console.error("Invalid reminder data received:", data);
          setErr("Failed to create reminder: Invalid response");
        }
      } catch (e) {
        console.error("Error creating reminder:", e);
        console.error("Error response:", e?.response?.data);
        // Check if it's an auth error
        if (e?.response?.status === 401 || e?.response?.status === 403) {
          // Let the interceptor handle the redirect
          return;
        }
        setErr(e?.response?.data?.error || e?.response?.data?.message || "Failed creating reminder");
        // Reset the ref on error so user can try again
        enterPressedRef.current = false;
      }
    };
    
    const handleCancelCreateReminder = () => {
      setCreatingReminderForFolder(null);
      setNewReminderText("");
      setNewReminderDate(null);
      setNewReminderTime(null);
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

    dayjs.extend(customParseFormat);

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
          console.error("Error loading data:", e);
          console.error("Error response:", e?.response?.data);
          // Check if it's an auth error
          if (e?.response?.status === 401 || e?.response?.status === 403) {
            // Let the interceptor handle the redirect
            return;
          }
          setErr(e?.response?.data?.error || e?.response?.data?.message || "Failed loading reminders");
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
          onPressEnter={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            enterPressedRef.current = true;
            if (newFolderName.trim()) {
              await handleCreateReminderFolder();
            } else {
              handleCancelCreateFolder();
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              if (!enterPressedRef.current) {
                handleCancelCreateFolder();
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
