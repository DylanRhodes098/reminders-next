
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
import { Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Flex, Divider} from 'antd';
import { useResponsive } from 'antd-style';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

// - - -  Data imports - - - //
import { SideNavRoutes } from '../data/mainListObjects';
import "../styles/SideNav.css";
import "../styles/listStyle.css";



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


    const enterPressedRef = useRef(false);
    // <- Tracks if Enter was pressed to prevent canceling on blur after Enter
    


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

    const [creatingSubListForFolder, setCreatingSubListForFolder] = useState(null);
    // <- Tracks which folder is in "create sublist" mode

    const [newSubListName, setNewSubListName] = useState("");
    // <- Stores the name of the new sublist being created

    const [openKeys, setOpenKeys] = useState([]);
    // <- Tracks which folders are open in the menu


    const [creatingFolder, setCreatingFolder] = useState(false);
    // <- Tracks if a folder is being created 
    
    const [newFolderName, setNewFolderName] = useState("");
    // <- Stores the name of the new folder being created 

  // - - -  Form - - - //
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



  // onClick Functions //
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

  // * * * Retrieve list data from database * * * // 
     async function retrieveList () {
        setErr("");
        try {
            const data = await listList();
            setList (data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retriveing" );
        }
     }

     // * * * Retrieve folder data from database * * * // 
     async function retrieveFolder () {
        setErr("");
        try{
            const data = await listFolder();
          
            setFolder(data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retrieving folders");
        }
     }

     // * * * Retrieve subList data from database * * * // 
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



   // <- Displays menu data according to Ants Menu Component -> // 
   function buildMenuItems(folders, subList) {

    // * Map through all folders  * // 
    return folders.map(folder => {
       // * * * Define sublists that belong to the current folder * * * // 
      const folderSubLists = subList.filter(sub => sub.folderId === folder.id);
       // * * * Define creating subList folder for the current folder  * * * // 
      const isCreating = creatingSubListForFolder === folder.id;
      

       // * Define subList menu using Ants Menu Component * // 
      const children = [

        // * * * Map through subList under spceific folder * * * // 
        ...folderSubLists.map(sub => ({

           // * * * Display subList name and delete icon * * * // 
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
                className="delete-icon"
                style={{ color: "#ff4d4f" }}
              />
            </div>
          ),

          // * * * Navigate to reminders page on subList click * * * // 
          onClick: () => navigate(`/sublist/${sub.id}`),
        })),


        
        // * Initiate create a subList function * // 

        // * * * Show Plus Circle Icon if no creating * * * // 
        ...(isCreating ? [] : [{
          key: `add-sublist-${folder.id}`,
          label: (<PlusCircleOutlined className="plus-icon" />),
          
        // * * * Click function on Plus Circle Icon * * * // 
          onClick: ({ domEvent }) => {

             // * * * * * Bug Protection * * * * * // 
            if (domEvent) {
              domEvent.stopPropagation();
            }
           
              // * * * * * Open Folder if not already opn * * * * * // 
            setOpenKeys(prev =>
              prev.includes(folder.id) ? prev : [...prev, folder.id]
            );
            
             // * * * * * Create subList mode / Prepare to create subList * * * * * // 
            setCreatingSubListForFolder(folder.id);
            setNewSubListName("");
            enterPressedRef.current = false;
          },
          style: { color: '#1890ff', cursor: "pointer" },
          
        }]),

        // * Create a subList function * // 
        ...(isCreating ? [{

        // * * * Show Input to create a subList * * * // 
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

              // * Input isn't focused function * // 
              onBlur={(e) => {
                setTimeout(() => {

               // * * * Only cancel if the blur wasn't caused by pressing Enter * * * // 
                  if (!enterPressedRef.current) {
                    handleCancelSubList();
                  }
                }, 0);
              }}
              autoFocus

                // * * * Bug Protection * * * // 
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {

                // * * * Confirm enter wasn't presed so it can be pressed again * * * // 
                if (e.key !== 'Enter') {
                  enterPressedRef.current = false;
                }
              }}
            />
          ),
        }] : [])
      ];



      // * Display folder menu using Ants Menu Component * // 
      return {
        key: String(folder.id),
        label: (

          // * * * Display folder name * * * // 
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{folder.name}</span>
      
            
            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFolder(folder.id);
              }}
              className="delete-icon"
            />
          </div>
        ),

        // * * * Display subList menu * * * // 
        children: children.length > 0 ? children : undefined,
      };
    });
  }

   // POST Data //

  // <- Add new folder to database -> //
  const handleCreateFolderInline = async () => {
    setErr("");

    // * * * Cancels Input if nothing was types * * * // 
    if (!newFolderName.trim()) {
      handleCancelCreateFolder();
      return;
    }
  
    try {

      // * * * Create and add data to database * * * //
      const data = await createFolderApi({ name: newFolderName.trim() });
      setFolder(current => [...current, data]);

      // * * * Close Input and reset values * * * // 
      setCreatingFolder(false);
      setNewFolderName("");
      enterPressedRef.current = false;

      // * * * Error handling * * * // 
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

  // * * * Define cancel Input field * * * // 
  const handleCancelCreateFolder = () => {
    setCreatingFolder(false);
    setNewFolderName("");
    enterPressedRef.current = false;
  };

  // <- Add new sublist to database -> //
    const handleCreateSubList = async (folderId) => {

      // * * * Cancel Input if nothing was typed * * * // 
      setErr("");
      if (!newSubListName.trim()) {
        handleCancelSubList();
        return;
      }

      // * * * Cancel Input if folder is missing * * * // 
      if (!folderId) {
        setErr("Folder ID is missing");
        handleCancelSubList();
        return;
      }
      try {

        // * * * Navigate to folder id  * * * //
        const payload = { 
          name: newSubListName.trim(), 
          folderId: folderId 
        };
        console.log("Creating sublist with payload:", payload);

        // * * * Create and add data to database * * * //
        const data = await createSubList(payload);
        setSubList(current => [...current, data]);

        // * * * Close Input and reset values * * * // 
        setCreatingSubListForFolder(null);
        setNewSubListName("");
        enterPressedRef.current = false;

        // * * * Error handling * * * // 
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

    // * * * Define cancel Input field * * * // 
    const handleCancelSubList = () => {
      setCreatingSubListForFolder(null);
      setNewSubListName("");
      enterPressedRef.current = false;
    };



    // DELETE Data //

    // <- DELETE sublist -> //
    const handleDeleteSubList = async (subListId) => {
      setErr("");
    
      try {

        // * * * Delete sublist from database * * * // 
        await deleteSubList(subListId);

        // * * * Navigate the subList Id and Delete sublist from frontend * * * // 
setSubList(current =>
          current.filter(sub => sub.id !== subListId)
        );
    
        navigate("/");
    
        // * * * Error handling * * * // 
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

        // * * * Delete folder from database * * * // 
        await deleteFolder(folderId);
    
        // * * * Navigate the folder Id and Delete folder from frontend * * * // 
        setFolder(current =>
          current.filter(folder => folder.id !== folderId)
        );
    
        // * * * Delete all sublists under this folder * * * // 
        setSubList(current =>
          current.filter(sub => sub.folderId !== folderId)
        );
    
        // * * * Close menu adter delete * * * // 
        setOpenKeys(current =>
          current.filter(key => key !== folderId)
        );
    
        navigate("/");
    
        // * * * Error handling * * * // 
      } catch (error) {
        console.error("Failed deleting folder:", error);
        setErr(
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed deleting folder"
        );
      }
    };
    


        // useEffect //
     useEffect (() => {
        (async () => {
            await retrieveList();
            await retrieveFolder();
            await retrieveSubList();
        })(); 
    }, []);

    // <- useEffect renders data when the page first loads -> //

    // <- The [] stops infinite rendering -> //

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
        <Divider />
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
  style={{ marginTop: 24 }}
  onClick={handleCreateFolderClick}
  className="plus-icon hover:bg-gray-100 rounded-md p-2"
/>
   
                </div>
        </>
     )

}
