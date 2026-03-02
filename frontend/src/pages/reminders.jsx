// - - - // - - - //
// Imports 
// - - - // - - - //

// < - React imports - > //
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useParams } from "react-router-dom";

// < - Backend imports - > //
import  { listReminders, createReminders, deleteReminders, updateReminders } from "../services/reminders";
import { getSubListById } from "../services/subList";
import { listReminderFolder, createReminderFolder,deleteReminderFolder } from "../services/reminderFolder";

// < -  UI Components - > //
import { DatePicker, Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex, Divider, TimePicker} from 'antd';
import { useResponsive } from 'antd-style';
import { PlusCircleOutlined, DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// < - Data imports - > //
import "../styles/SideNav.css";
import "../styles/listStyle.css";
import "../styles/global.css"
import { RemindersDropDown } from "../data/remindersDropDown";

 // »« - »« »« - »« »« - »« //
// Primary Function 
// »« - »« »« - »« »« - »« //
export default function Reminders () {

// - - - // - - - //
// Usecases
// - - - // - - - //

    // - - - GlobalUses - - - //

    const navigate = useNavigate();
 
    // < - useParams reads the current URL, allowing you to identify what data should be displayed. - > //
    // < - Example =  if (!subListId) return; setErr(""); - > //
    // < - try { const subListData = await getSubListById(subListId); setSubList(subListData); } - > //
    // < - catch (error) { setErr(error?.response?.data?.error || "Failed to load data"); setSubList(null); }. - > //
    const { subListId } = useParams();
    
     // < - Ants DatePicker Component - > //
    // < - Example = </Form.Item> <Form.Item label="Date"> <DatePicker /> </Form.Item>. - > // 
    const { RangePicker } = DatePicker;

     // < - Ants Input Component. - > //
    // < - Example = <TextArea rows={4} />. - > // 
    const { TextArea } = Input;

    // < - Allows dayjs to be used - > //
    dayjs.extend(customParseFormat);
 
    // - - -  UseRef - - - //

      // <- useRef creates, defines and changes a DOM element without re-rendering.
      // <- Often defined as X.current ({current : "value"})
      // <- null is semantic for useref, its easy for the DOM to read. 

      // <- createRowRef defines the create row div as null, {current : "null"}. 
      // <- You have the option to define methods for the DOM without re-rendering, such as createRowRef.current.scroll.
    const createRowRef = useRef(null);

    // < - defines the enterPressed ref as a boolean, starting with false - > //
    // < - You have the option to change to true when enter is pressed - > //
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

    // < - A useState that starts as an empty string and is used for inputting a new reminder - > //
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
  
// - - - // - - - //
// Single Fuctions 
// - - - // - - - //

  // »« - »« »« - »« »« - »« //
  // onClick Function 
  // »« - »« »« - »« »« - »« //
  const onClick = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      navigate(path); // 👈 navigate
    }
  };

   // »« - »« »« - »« »« - »« //
   // Ignore th onBlur function for a period of time (so you can use date and time picker without clsing folder view)
    // »« - »« »« - »« »« - »« //
  const armIgnoreBlur = () => {

    // < - set a useref to true - > //
    ignoreBlurRef.current = true;

    // < - set useref back to false after 0.2 seconds - > //
    setTimeout(() => {
      ignoreBlurRef.current = false;
    }, 200);
  };

   // »« - »« »« - »« »« - »« //
   // Resets all input fields for creating remider back to defualt usestate 
   // »« - »« »« - »« »« - »« //
  const resetCreateReminderRow = (folderId) => {

    // < - Target curret folder as active - > //
    setCreatingReminderForFolder(folderId);

     // < - Resets the input field to an empty string - > //
    setNewReminderText("");
  
     // < - Resets the date field to null - > //
    setNewReminderDate(null);

    setNewReminderTime(null);
    setDateOpen(false);
    setTimeOpen(false);
    enterPressedRef.current = false;
  
    // < - After everything else is executed - > // 
    setTimeout(() => {
      // < - refocus on reminder input field - > //
      reminderInputRef.current?.focus?.();
    }, 0);
  };

// »« - »« »« - »« »« - »« //
// startEditingReminder
// »« - »« »« - »« »« - »« //
  const startEditingReminder = (reminder) => {

    // < - Define editing reminder id to reminder id - > //
    setEditingReminderId(reminder.id);

     // < - Define editing reminder text to reminder note or an empty strig (allows for optionality) - > //
    setEditReminderText(reminder.note || "");

     // < - Define editing reminder date as dayjs object or null (allows for optionality) - > //
    setEditReminderDate(reminder.date_of_reminder ? dayjs(reminder.date_of_reminder) : null);

    // < - Define editing reminder time as dayjs object or null (allows for optionality) - > //
    setEditReminderTime(reminder.date_of_reminder ? dayjs(reminder.date_of_reminder) : null);

    // < - Define editing reminder date field as false to start closed - > //
    setEditDateOpen(false);

    // < - Define editing reminder time field as false to start closed - > //
    setEditTimeOpen(false);
  
    // < - Run the rest of the function before focusing on the input field - > //
    setTimeout(() => editInputRef.current?.focus?.(), 0);
  };
  
  // »« - »« »« - »« »« - »« //
  // A function that resets all reminder fields when user wants to stop/cancel an edit 
  // »« - »« »« - »« »« - »« //
  const cancelEditingReminder = () => {
    setEditingReminderId(null);
    setEditReminderText("");
    setEditReminderDate(null);
    setEditReminderTime(null);
    setEditDateOpen(false);
    setEditTimeOpen(false);
  };

   // »« - »« »« - »« »« - »« //
   // resets all usestates when a user wants to stop creating a reminder 
   // »« - »« »« - »« »« - »« //
   const handleCancelCreateReminder = () => {
    setCreatingReminderForFolder(null);
    setNewReminderText("");
    setNewReminderDate(null);
    setNewReminderTime(null);
    enterPressedRef.current = false;
  };
  

  // - - - // - - - // 
  // CRUD Functions 
  // - - - // - - - // 

  // - - - GET Data - - - //

  // »« - »« »« - »« »« - »« //
  // Menu fucntion that retrives paraemters folders and reminders //
  // »« - »« »« - »« »« - »« //
  function buildMenuItems(folders, reminders) {

    // < - Map through the folders object, labelling each value as folder - > // 
    return folders.map((folder) => {

        // < - Confirm reminders match each folder by Id - > //
      const folderReminders = reminders.filter(

        // < - reminders in current reminder folder match the folder id - > //
        (r) => r.reminderFolderId === folder.id
      );
  
          // < - Confirm the createReminder row is in the correct Folder using Id - > //
      const isCreating = creatingReminderForFolder === folder.id;
  
// < - define an array called children - > //
      const children = [
        
        // < - Map through the reminders in the current folder - > //
        ...folderReminders.map((reminder) => {

          // < - Cofirm the reminder is being edited in editig mode. - > //
          const isEditing = editingReminderId === reminder.id;
  
          // < - UI For editing a reminder - > //
          return {

            // < - Confirm the correct reminder you're editing using id - > //
            key: reminder.id,

            // < - If editing, display the input field and datepicker - > //
            label: isEditing ? (
      
              // < - Main div - > //
              <div
                style={{ width: "100%", padding: "8px 0"}}

                // < - Bug handler - > //
                onClick={(e) => e.stopPropagation()}
              >

                {/* < - Input field - > */}
                {/* < - Assign a null ref to make changes, and toggle in and out of focus wihtout re-rendering - > */}
                {/* < - Assign value of input for backend - > */}
                {/* < - When changed, update the inputs value - > */}
                {/* < - When enter is pressed - > */}
                <Input
                  ref={editInputRef}
                  placeholder="Edit reminder"
                  bordered={false}
                  value={editReminderText}
                  onChange={(e) => setEditReminderText(e.target.value)}
                  onPressEnter={async (e) => {

                    // < - Bug handler - > //
                    e.stopPropagation();

                    // < - If there isnt any edits - > //
                    if (!editReminderText.trim()) {

                      // < - execute cancel editing fuction - > //
                      cancelEditingReminder();

                      // < - Stop runing function - > //
                      return;
                    }

                    // < - Else, execute the handleupdatereminder fuction, which ubers the edited reminder payload to backend - > //
                    await handleUpdateReminder(reminder);
                  }}
                  onBlur={() => {

                    // < - Create a timeout - > //
                    setTimeout(() => {

                      // < - if something else is clicked (date/time picker), do nothing - > //
                      if (ignoreBlurRef.current) return;

                      // < - if choosing a date or time, do nothing - > //
                      if (editDateOpen || editTimeOpen) return;

                      // < - else, clicking/leaving the input field cancels the edit - > //
                      cancelEditingReminder();
                    }, 0);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
  
                {/* < - Date and time picker container - > */}
                {/* < - When date picker is open, execute igore blur funciton - > */}
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <DatePicker
                    placeholder="Date"
                    value={editReminderDate}
                    onChange={setEditReminderDate}
                    getPopupContainer={() => document.body}
                    open={editDateOpen}
                    onOpenChange={(open) => {
                      
                      // < - start with date picker open - > //
                      setEditDateOpen(open);

                      // < - if datepicker is open, ignore the blur prop - > //
                      if (open) armIgnoreBlur();
                    }}
                    onMouseDown={(e) => {

                      // < - Bug handlers - > //
                      e.preventDefault();
                      e.stopPropagation();

                      // < - Igore Blur - > //
                      armIgnoreBlur();

                      // < - Keep in editing mode - > //
                      setEditDateOpen(true);
                    }}
                    style={{ width: 120 }}
                    classNames={{ popup: { root: "reminder-picker-popup" } }}
                  />
  
                  <TimePicker
                    placeholder="Time"
                    value={editReminderTime}
                    onChange={setEditReminderTime}
                    format="HH:mm"
                    getPopupContainer={() => document.body}
                    open={editTimeOpen}
                    onOpenChange={(open) => {
                      setEditTimeOpen(open);
                      if (open) armIgnoreBlur();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      armIgnoreBlur();
                      setEditTimeOpen(true);
                    }}
                    style={{ width: 100 }}
                    classNames={{ popup: { root: "reminder-picker-popup" } }}
                  />
                </div>
              </div>

               // < - If not editing, display current note, date and any relevant icons - > //
            ) : (

              // < - Reminder cotainer - > //
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}

                // < - When reminder is clicked - > //
                onClick={(e) => {

                  // < - bug handler - > //
                  e.stopPropagation();

                  // < - Execute editing reminder function - > //
                  startEditingReminder(reminder);
                }}
              >

                {/* < - Display the reminder note in the ui - > */}
                <span>{reminder.note}</span>
  
                {/* < - Date and time container - > */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >

                  {/* < - display date and time - > */}
                  {reminder.date_of_reminder && (
                    <>
                      <span style={{ padding: "0 10px", color: "#9ca3af" }}>
                        {dayjs(reminder.date_of_reminder).format("DD/MM/YYYY")}
                      </span>
                      <span style={{ padding: "0 10px", color: "#9ca3af" }}>
                        {dayjs(reminder.date_of_reminder).format("HH:mm")}
                      </span>
                    </>
                  )}
  
                  {/* < - Display the info icon - > */}
                  <InfoCircleOutlined className="info-icon" />
  
                  {/* < - Display the bin icon - > */}
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
            ),
          };
        }),
        
        // ! - ! this allows the folder to stay open when in reminder ediitng mode ! - ! //
        // < - Fetch the isCreating array - > //
        ...(isCreating

          // < - If an empty array - > //
          ? []

          // < - else an object array with data where... - > //
          : [
              {

                // < - the key has a folder id - > //
                key: `add-${folder.id}`,

                // < - The folder is open, display plus sign - > //
                label: <PlusCircleOutlined className="plus-icon" />,

                // < - When plus sign is clicked, prepare to create a new reminder - > //
                onClick: ({ domEvent }) => {

                  // < - stopPropagtion stops bugs - > //
                  domEvent.stopPropagation();

                    // < - Defines the openkey usestate to the correct folder array - > //
                    // < - Define the new set as the existing set, forcing the folder to stay open - > //
                  setOpenKeys((prev) => [...new Set([...prev, folder.id])]);
                  setCreatingReminderForFolder(folder.id);
  
                  // < - CUse cancel edit function to reset all reminder fields - > // 
                  cancelEditingReminder();
  
                  // < - Reset all reminder input fields when creating a new reminder - > // 

                  setNewReminderText("");
                  // < - Resets the input field back to an emptry string - > //

                  setNewReminderDate(null);
                  // < - Resets the date field to null - > //
                  setNewReminderTime(null);
                  setDateOpen(false);
                  setTimeOpen(false);
                  enterPressedRef.current = false;
                },
              },
            ]),

        // ! - ! this allows create mode when plus sign is clicked ! - ! //
         // < - Fetch the isCreating array - > //
        ...(isCreating

          // < - If user wants to create a reminder - > //
          ? [
              {
                
                // < - Locate folder where reminder will be created - > //
                key: `create-${folder.id}`,

                // < - Display Input and date picker for creating - > //
                label: (
                  <div ref={createRowRef} style={{ width: "100%", padding: "8px 0" }}>
                       {/* < - Create main div container with optional useref - > */}
                  {/* < - Input field - > */}
                  {/* < - The usestate the input updates is the newReminderText - > */}
                  {/* < - e is the input field, target highlights the input field, value reads whats in the input field - > */}
                  {/* < - When enter is pressed - > */}
                    <Input
                      placeholder="New reminder"
                      bordered={false}
                      autoFocus
                      value={newReminderText}
                      onChange={(e) => setNewReminderText(e.target.value)}
                      onPressEnter={async (e) => {

                        // < - if e does not bug and enter is pressed - > //
                        if (e?.stopPropagation) e.stopPropagation();
                        enterPressedRef.current = true;
  
                        // < - Use cancel edit function to reset all reminder fields - > //
                        cancelEditingReminder();
  
                        // < - If newReminderText useState has changed - > //
                        if (newReminderText.trim()) {

                          // < - Execute create reminder function - > //
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
                      onKeyDown={(e) => {
                        if (e.key !== "Enter") enterPressedRef.current = false;
                        else enterPressedRef.current = true;
                      }}
                      onClick={(e) => {
                        if (e?.stopPropagation) e.stopPropagation();
                      }}
                    />
  
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
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
                          e.preventDefault();
                          e.stopPropagation();
                          armIgnoreBlur();
                          setDateOpen(true);
                        }}
                        style={{ width: 120 }}
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
                ),
              },
            ]
          : []),
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
        children,
      };
    });
  }
   

    // - - - POST Data - - - //

    // »« - »« »« - »« »« - »« //
    // Create Folder //
    // »« - »« »« - »« »« - »« //
    const handleCreateReminderFolder = async () => {

      // < - if there isnt a new folder name, cancel create folder - > //
      if (!newFolderName.trim()) return handleCancelCreateFolder();

      // < - if there isnt a sublist id, cancel function - > //
      if (!subListId) {
        setErr("Missing subListId");
        return;
      }
    
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      // Hub //
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      try {

        // @ - @ @ - @ @ - @ //
        // uber folder name and sublist id to backend //
        // @ - @ @ - @ @ - @ //
        const data = await createReminderFolder({
          name: newFolderName.trim(),
          subListId: subListId,
        });

        // < - Once parsed successfully, add it to the folder array - > //
        setReminderFolders(prev => [...prev, data]);

        // < - Execute cancel reminder folder funciton - > // 
        handleCancelCreateFolder();

        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
        // Departure //
        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      } catch (e) {
 
        // * * * //
        // Check if it's an auth error //
        // * * * //
        if (e?.response?.status === 401 || e?.response?.status === 403) {
          // < - Let the interceptor handle the redirect - > //
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

    // »« - »« »« - »« »« - »« //
    // Create Reminder  
    // »« - »« »« - »« »« - »« //
    const handleCreateReminder = async (folderId) => {

    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    // GateKeeper 
    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

      // * * * //
      // If user does not input text
      //  * * * //
      if (!newReminderText.trim()) {

        // < - execute cancel reminder creation function - > //
        handleCancelCreateReminder();
        return;
      }

       // * * * //
       // If a sublist id is not assigned to reminder 
       // * * * //
      if (!subListId) {

        // < - respond with error message - > //
        setErr("Missing subListId");
        return;
      }
    
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ // 
      // Hub 
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      try {
      
         // < - Define date and time as null -> //
        let dateOfReminder = null;

        // * * * //
        // If new date is defined 
        // * * * //
        if (newReminderDate) {

           // < * * And, if new time is defined * * > //
          if (newReminderTime) {

            // < - Define date using toDate so it can be read by javascript, the backend and be able to use javascript methods. -> //
            const date = newReminderDate.toDate();

             // < - Define time using toDate so it can be read by javascript, the backend and be able to use javascript methods. -> //
            const time = newReminderTime.toDate();

            // < - Confirm date hour data matches times hour data. -> //
            date.setHours(time.getHours());

            // < - Confirm date Minutes data matches times Minutes data. -> //
            date.setMinutes(time.getMinutes());

            // < - Confirm Seconds hour data matches times Seconds data. -> //
            date.setSeconds(time.getSeconds());

            // < - redefine dateOfReminder as newly configured date state converted into a ISOS String for the backend to successfully read. -> //
            dateOfReminder = date.toISOString();

            // ! - ! This If statments coverts antDs date and time picker data into data that can be read by the backend ! - ! //
          
            // < < * If user only chooses a date * > > //
          } else {

            // < - create a new date, converting format into readable javascript data - > //
            dateOfReminder = newReminderDate.toDate().toISOString();
          }

            // < < * If user only uses time * > > //
        } else if (newReminderTime) {
          
          // < - Define todays date as dayjs object -> //
          const today = dayjs();

          // < - Define time as reminder time usestate with readable javascript -> //
          const time = newReminderTime.toDate();

          // < - Combine chosen time with todays date -> //
          const combined = today.hour(time.getHours()).minute(time.getMinutes()).second(time.getSeconds());

          // < - Define chose date and time into readable javascript  -> //
          dateOfReminder = combined.toDate().toISOString();
        }

          // < - Define the neccessary values for the create reminder function to parse through the backend successfully -> //
        const payload = {
          note: newReminderText.trim(),
          reminderFolderId: folderId,
          subListId: subListId,
        };

         // * * * //
         //  If date has been changed 
         // * * * //
        if (dateOfReminder) {

          // < - Allows date to be optional, adds to the payload if user chooses a date/time - > //
          payload.date_of_reminder = dateOfReminder;
        }

         // @ - @ @ - @ @ - @ //
         // Uber payload to terminal (services), to be automated through the temrinal (backend) 
         // @ - @ @ - @ @ - @ //
        const data = await createReminders(payload);
      
    
        // * * * //
        // If payload is accepted by the backend 
        // * * * //
        if (data && data.id) {

          // < - Map through the reminders array, each reminder labeled prev - > //
          setReminders(prev => {

            // < - Retreieve all reminders, and add new reminder on the end - > //
            const updated = [...prev, data];
            console.log("Updated reminders state:", updated);

            // < - Display updated reminder in UI - > //
            return updated;
          });

            // < - Display create reminder input (ready to create another) - > //
          resetCreateReminderRow(folderId); 

          // < < * else sed error message * > > //
        } else {
          console.error("Invalid reminder data received:", data);
          setErr("Failed to create reminder: Invalid response");
        }

      // ‡ - ‡ ‡ - ‡ ‡ - ‡ // 
      // Departure 
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      } catch (e) {
       
        // * * * //
        // If there is an auth arror
        // * * * //
        if (e?.response?.status === 401 || e?.response?.status === 403) {
          
          // < - Exit and return undefined - > //
          return;
        }

        // < - And if data error - > //
        setErr(e?.response?.data?.error || e?.response?.data?.message || "Failed creating reminder");

        // < - Turn off enter pressed so user can press enter again (try agai) -> //
        enterPressedRef.current = false;
      }
    };

    // - - - PUT Data - - - //

    // »« - »« »« - »« »« - »« //
    // Update reminder using reminder parameter //
    // »« - »« »« - »« »« - »« //
    const handleUpdateReminder = async (reminder) => {

      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      // Hub //
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      try {

        // < - Define date of reminder as null - > //
        let dateOfReminder = null;
    
        // * * * //
        // if date has changed/edited //
        // * * * //
        if (editReminderDate) {

          // < - define date as date.js so antDs can read it - > //
          const date = editReminderDate.toDate();

          // * * * //
          // if time has chaged/edited //
          // * * * //
          if (editReminderTime) {

            // < - define time as date.js so antDs can read it - > //
            const time = editReminderTime.toDate();

            // < - Combine date and time into a single Date object - > //
            date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
          }

          // < - Redefine date into an isosstrig to be successfulyl parsed to the backend - > //
          dateOfReminder = date.toISOString();
        }
    
        // < - Edit reminder paylod - > //
        const payload = {

          // < - note is the new reminder data - > //
          note: editReminderText.trim(),

          // < - date of remidner is newly defined date - > //
          date_of_reminder: dateOfReminder,
        };
    
        // @ - @ @ - @ @ - @ //
        // Uber payload to terminal (services), to be automated through the temrinal (backend) //
        // @ - @ @ - @ @ - @ //
        const updated = await updateReminders(reminder.id, payload);
    
        // < - Once parsed through backend successfully, retrieve previous reminders, and add the nre one on the end - > //
        setReminders(prev => prev.map(r => (r.id === reminder.id ? updated : r)));

        // < - Execture cancel efit function - > //
        cancelEditingReminder();

        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
        // Departure //
        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      } catch (e) {
        console.error("Error updating reminder:", e);
        setErr(e?.response?.data?.error || e?.response?.data?.message || "Failed updating reminder");
      }
    };
    

    // - - - DELETE Data - - - //

    // »« - »« »« - »« »« - »« //
    // Delete Folder function //
    // »« - »« »« - »« »« - »« //
    const handleDeleteReminderFolder = async (id) => {

      // @ - @ @ - @ @ - @ //
      // Uber the folder id to the services and backend to be deleted //
      // @ - @ @ - @ @ - @ //
      await deleteReminderFolder(id);
    
      // < - Once deleted on the backend, delete the folder on the frontend - > //
      setReminderFolders(prev => prev.filter(f => f.id !== id));

      // < - delete all reminders in that folder on the frontend - > //
      setReminders(prev => prev.filter(r => r.reminderFolderId !== id));
    };
    
    // »« - »« »« - »« »« - »« //
    // Delete reminder function //
    // »« - »« »« - »« »« - »« //
    const handleDeleteReminder = async (id) => {

      // @ - @ @ - @ @ - @ //
      // Uber the reminder id to the services and backend to be deleted //
      // @ - @ @ - @ @ - @ //
      await deleteReminders(id);

      // < - Once deleted on the backend, delete the reminder on the frontend - > //
      setReminders(prev => prev.filter(r => r.id !== id));
    };

     // - - - Other - - - //

     // »« - »« »« - »« »« - »« //
     // UseEffect function //
     // »« - »« »« - »« »« - »« // 

     // ! - ! 3 ways of deifing useEffect ! - ! //
      // < - First is without a depenedncy array (contact list), this forces useeffect to ru when the page loads and after every page render. - > //
      // < - Second is with an empty dependcy array, running when the page first loads and thats it - > //
      // < - Third, with a dpeendyc array, runs whe page laods and then when the dependyc array changes/re-renders. - > //
     useEffect(() => {

      // < - if there isnt a sublist id, stop running function - > //
      if (!subListId) return;
    
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      // Hub //
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      (async () => {
        try {

          // < - Define setErr to an empty strig - > //
          setErr("");
    
          // @ - @ @ - @ @ - @ //
          // Uber subList id to the backend to fetch subList Id //
          // @ - @ @ - @ @ - @ //
          const subListData = await getSubListById(subListId);

          // < - redefine subList to newly edited data - > //
          setSubList(subListData);

          // @ - @ @ - @ @ - @ //
          // Uber subListId to the backend to fetch folder id/s //
          // @ - @ @ - @ @ - @ //
          const folders = await listReminderFolder(subListId);

          // @ - @ @ - @ @ - @ //
          // Uber subList id to the backend to fetch reminder id/s //
          // @ - @ @ - @ @ - @ //
          const reminders = await listReminders(subListId);
    
          // < - redefine folders to newly edited data, if none, retur an empty array - > //
          setReminderFolders(Array.isArray(folders) ? folders : []);

          // < - redefine reminders to newly edited data, if none, return an empty array - > //
          setReminders(Array.isArray(reminders) ? reminders : []);
    

          // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
          // Departure //
          // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
        } catch (e) {
       
          // * * * //
          // Check if it's an auth error //
          // * * * //
          if (e?.response?.status === 401 || e?.response?.status === 403) {
            // < - Let the interceptor handle the redirect - > //
            return;
          }
          setErr(e?.response?.data?.error || e?.response?.data?.message || "Failed loading reminders");
        }
      })();

      // < - Dependyc array, run usefeffect when subListId changes - > //
    }, [subListId]);
  


     return (
        <>
        <div className="Global"> 
        <h1 className="mb-4 font-bold text-xl">
        {subList ? subList.name : "Loading..."}
        </h1>
        <Divider />
        <Menu
  mode="inline"
  openKeys={openKeys}
  onOpenChange={setOpenKeys}
  style={{backgroundColor:"#d8f9ff" }}
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
