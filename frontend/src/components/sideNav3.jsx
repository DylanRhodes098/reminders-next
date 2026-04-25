
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// < - Backend imports - > //
import { listAgentFolder, createAgentFolder,deleteAgentFolder } from "../services/agentFolder.js";
import { listAgentSubFolder, createAgentSubFolder,deleteAgentSubFolder } from "../services/agentSubFolder.js";
import { createAgent } from "../services/AI/agent.js";

// < -  UI Components - > //
import { DatePicker, Button, Dropdown, Space, Modal, Card, Menu, Checkbox, Form, Input, ConfigProvider, Divider, TimePicker } from 'antd';
import { useResponsive } from 'antd-style';
import { DeleteOutlined, InfoCircleOutlined, FolderAddOutlined, RobotOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// < - Data imports - > //
import { SideNavRoutes } from "../data/mainListObjects.jsx";
import "../styles/SideNav.css";
import "../styles/listStyle.css";
import "../styles/global.css";

const routesByKey = SideNavRoutes;

export default function SideNav() {
   // - - -  GlobalUses - - - //
   const navigate = useNavigate();
   // <- useNavigate changes the url without a full window refresh. 

   // <- It's an upgrdae to conventional window.location.href.

   // <- Syntax = onClick: () => navigate("path"). 

   // <- Example = onClick: () => navigate(`/agent?agentSubFolderId=${sub.id}`). 

   // <- Example = navigate("/login", { replace: true }); <- Stops users from pressing back. 

   const [agentFolderForm] = Form.useForm();
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

   const [agentFolder, setAgentFolder] = useState([]);
   // <- Agent folders array; update with setAgentFolder.

   // <- Example = const data = await listAgentFolder(); setAgentFolder(data); 

   const [list, setList] = useState([]); 
   // <- Starts list as an array, and gives you the ability to update the list array using setList.

   // <- Example =  const data = await listList(); setList(data);. 

   const [agentSubFolder, setAgentSubFolder] = useState([]); 
   // <- Agent sub folders array; update with setAgentSubFolder.

   // <- Example = const data = await listAgentSubFolder(); setAgentSubFolder(data); 

   const [creatingSubListForFolder, setCreatingSubListForFolder] = useState(null);
   // <- Which agentFolder.id is in "create agentSubFolder" mode (inline input).

   const [newAgentSubFolderName, setNewAgentSubFolderName] = useState("");
   // <- Draft name for createAgentSubFolder payload.

   const [openKeys, setOpenKeys] = useState([]);
   // <- Which agentFolder submenu keys are expanded in the Menu.


   const [creatingAgentFolder, setCreatingAgentFolder] = useState(false);
   // <- Tracks if a folder is being created 
   
   const [newAgentFolderName, setNewAgentFolderName] = useState("");
   // <- Stores the name of the new folder being created 

   const [creatingStandaloneAgentSubFolder, setCreatingStandaloneAgentSubFolder] =
     useState(false);
   const [newStandaloneAgentSubFolderName, setNewStandaloneAgentSubFolderName] =
     useState("");

   // - - - Create "Agent interface" modal (name-only for now) - - - //
   const [createAgentModalOpen, setCreateAgentModalOpen] = useState(false);
   const [createAgentName, setCreateAgentName] = useState("");
   const [createAgentParentFolderId, setCreateAgentParentFolderId] =
     useState(null);
   const [createAgentLoading, setCreateAgentLoading] = useState(false);

  // - - -  Backend Functions - - - //

  // GET Data //

  // * * * Retrieve agentFolder state via listAgentFolder() * * * //
  async function retrieveAgentFolder() {
    setErr("");
    try {
      const data = await listAgentFolder();
      setAgentFolder(data);
    } catch (error) {
      setErr(error?.response?.data?.error || "failed retrieving agent folders");
    }
  }

  // * * * Retrieve agentSubFolder state via listAgentSubFolder() * * * //
  async function retrieveAgentSubFolder() {
    setErr("");
    try {
      const data = await listAgentSubFolder();
      setAgentSubFolder(data);
    } catch (error) {
      setErr(error?.response?.data?.error || "failed retrieving agent sub folders");
    }
  }

  // <- Top-level menu rows: agentSubFolders with no agentFolderId -> //
  function buildStandaloneAgentSubFolderMenuItems(agentSubFolders) {
    return agentSubFolders
      .filter((sub) => !sub.agentFolderId)
      .map((sub) => ({
        key: `standalone-${sub.id}`,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="text-[rgba(0,0,0,0.88)] dark:text-[rgba(255,255,255,0.85)]">
              {sub.name}
            </span>
            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAgentSubFolder(sub.id);
              }}
              className="delete-icon"
              style={{ color: "#ff4d4f" }}
            />
          </div>
        ),
        onClick: () =>
          navigate(`/agent?agentSubFolderId=${encodeURIComponent(sub.id)}`),
      }));
  }

  // <- Displays menu data according to Ants Menu Component -> //
  function buildMenuItems(agentFolders, agentSubFolders) {

    // * Map through all agentFolder rows * //
    return agentFolders.map((folder) => {
      // * * * Agent sub folders that belong to this agentFolder (agentFolderId) * * * //
      const agentSubFoldersForFolder = agentSubFolders.filter(
        (sub) => sub.agentFolderId === folder.id
      );
      // * * * creatingAgentSubFolderForFolder: matches creatingSubListForFolder + folder.id * * * //
      const isCreating = creatingSubListForFolder === folder.id;

      // * * * Agent sub folder menu items (Ant Menu) * * * //
      const children = [

        // * * * Each agentSubFolder under this agentFolder * * * //
        ...agentSubFoldersForFolder.map((sub) => ({

           // * * * Agent sub folder label + delete * * * //
          key: sub.id,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="text-[rgba(0,0,0,0.88)] dark:text-[rgba(255,255,255,0.85)]">
                {sub.name}
              </span>

              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAgentSubFolder(sub.id);
                }}
                className="delete-icon"
                style={{ color: "#ff4d4f" }}
              />
            </div>
          ),

          // * * * Navigate to agent page (optional agentSubFolderId in query) * * * //
          onClick: () =>
            navigate(`/agent?agentSubFolderId=${encodeURIComponent(sub.id)}`),
        })),

        // * * * Start creating an agentSubFolder (plus icon) * * * //

        // * * * Plus only when not already creating for this agentFolder * * * //
        ...(isCreating ? [] : [{
          key: `add-agent-subfolder-${folder.id}`,
          label: (<RobotOutlined className="plus-icon" />),

        // * * * Robot onClick: add agentSubFolder under this folder * * * //
          onClick: ({ domEvent }) => {

             // * * * * * Bug Protection * * * * * //
            if (domEvent) {
              domEvent.stopPropagation();
            }

            setCreatingStandaloneAgentSubFolder(false);
            setNewStandaloneAgentSubFolderName("");

              // * * * * * Open agentFolder submenu if closed * * * * * //
            setOpenKeys((prev) =>
              prev.includes(folder.id) ? prev : [...prev, folder.id]
            );

            openCreateAgentModal(folder.id);
          },
          style: { color: '#1890ff', cursor: "pointer" },

        }]),

        // * * * Inline Input to create agentSubFolder * * * //
        ...(isCreating ? [{

        // * * * newAgentSubFolderName controlled Input * * * //
          key: `create-agent-subfolder-${folder.id}`,
          label: (
            <Input 
              placeholder="New" 
              bordered={false}
              value={newAgentSubFolderName}
              onChange={(e) => setNewAgentSubFolderName(e.target.value)}
              onPressEnter={async (e) => {
                e.stopPropagation();
                enterPressedRef.current = true;
                if (newAgentSubFolderName.trim()) {
                  await handleCreateAgentSubFolder(folder.id);
                } else {
                  handleCancelAgentSubFolder();
                }
              }}

              // * * * onBlur: cancel unless Enter was used * * * //
              onBlur={(e) => {
                setTimeout(() => {

               // * * * enterPressedRef guards blur-after-Enter * * * //
                  if (!enterPressedRef.current) {
                    handleCancelAgentSubFolder();
                  }
                }, 0);
              }}
              autoFocus

                // * * * Bug Protection * * * //
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {

                // * * * Reset enterPressedRef when key is not Enter * * * //
                if (e.key !== 'Enter') {
                  enterPressedRef.current = false;
                }
              }}
            />
          ),
        }] : [])
      ];

      // * * * One agentFolder row (label + agentSubFolder children) * * * //
      return {
        key: String(folder.id),
        label: (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-[rgba(0,0,0,0.88)] dark:text-[rgba(255,255,255,0.85)]">
              {folder.name}
            </span>

            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAgentFolder(folder.id);
              }}
              className="delete-icon"
            />
          </div>
        ),
        children: children.length > 0 ? children : undefined,
      };
    });
  }

  const openCreateAgentModal = (agentFolderId = null) => {
    setErr("");
    setCreateAgentParentFolderId(agentFolderId);
    setCreateAgentName("");
    setCreateAgentModalOpen(true);
  };

  const handleCreateAgentSubFolder = async (agentFolderId) => {
    // legacy inline path — now uses modal instead
    openCreateAgentModal(agentFolderId);
  };

  const handleCancelAgentSubFolder = () => {
    setCreatingSubListForFolder(null);
    setNewAgentSubFolderName("");
    enterPressedRef.current = false;
  };

  const handleDeleteAgentSubFolder = async (agentSubFolderId) => {
    setErr("");
    try {
      await deleteAgentSubFolder(agentSubFolderId);
      setAgentSubFolder((current) =>
        current.filter((sub) => sub.id !== agentSubFolderId)
      );
      navigate("/");
    } catch (error) {
      console.error("Failed deleting agent sub folder:", error);
      setErr(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed deleting agent sub folder"
      );
    }
  };

  const handleDeleteAgentFolder = async (agentFolderId) => {
    setErr("");
    try {
      await deleteAgentFolder(agentFolderId);
      setAgentFolder((current) =>
        current.filter((f) => f.id !== agentFolderId)
      );
      setAgentSubFolder((current) =>
        current.filter((sub) => sub.agentFolderId !== agentFolderId)
      );
      setOpenKeys((current) => current.filter((key) => key !== agentFolderId));
      navigate("/");
    } catch (error) {
      console.error("Failed deleting agent folder:", error);
      setErr(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed deleting agent folder"
      );
    }
  };

  const handleCreateAgentFolderClick = () => {
    setCreatingStandaloneAgentSubFolder(false);
    setNewStandaloneAgentSubFolderName("");
    setCreatingAgentFolder(true);
    setNewAgentFolderName("");
    enterPressedRef.current = false;
  };

  const handleStandaloneAgentSubFolderRobotClick = () => {
    openCreateAgentModal(null);
  };

  const handleCancelStandaloneAgentSubFolder = () => {
    setCreatingStandaloneAgentSubFolder(false);
    setNewStandaloneAgentSubFolderName("");
    enterPressedRef.current = false;
  };

  const handleCreateStandaloneAgentSubFolderInline = async () => {
    // legacy inline path — now uses modal instead
    openCreateAgentModal(null);
  };

  const handleSubmitCreateAgentModal = async () => {
    setErr("");
    const name = createAgentName.trim();
    if (!name) return;

    setCreateAgentLoading(true);
    try {
      // 1) Create AI agent (defaults for everything except name)
      const aiAgent = await createAgent({ name });

      // 2) Create UI subfolder linked to the AI agent
      const payload = {
        name,
        agentFolderId: createAgentParentFolderId ?? undefined,
        agentId: aiAgent?.id,
      };
      const sub = await createAgentSubFolder(payload);

      setAgentSubFolder((current) => [...current, sub]);
      setCreateAgentModalOpen(false);

      // Navigate directly to agent chat view for this UI subfolder
      navigate(`/agent?agentSubFolderId=${encodeURIComponent(sub.id)}`);
    } catch (error) {
      console.error("Error creating agent interface:", error);
      setErr(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "failed creating agent"
      );
    } finally {
      setCreateAgentLoading(false);
    }
  };

  const handleCreateAgentFolderInline = async () => {
    setErr("");
    if (!newAgentFolderName.trim()) {
      handleCancelCreateAgentFolder();
      return;
    }
    try {

      // Send the created folder to the backend // 
      const data = await createAgentFolder({ name: newAgentFolderName.trim() });

      // The data to send back to the backend will be all the names of the folders, including the new one // 
      setAgentFolder((current) => [...current, data]);

      // Reset the bolean back to false // 
      setCreatingAgentFolder(false);

      // Reset the input field back to an empty string //
      setNewAgentFolderName("");

      // 
      enterPressedRef.current = false;
    } catch (error) {
      console.error("Failed creating agent folder:", error);
      setErr(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed creating agent folder"
      );
      enterPressedRef.current = false;
    }
  };

  const handleCancelCreateAgentFolder = () => {
    setCreatingAgentFolder(false);
    setNewAgentFolderName("");
    enterPressedRef.current = false;
  };

  const onClickHome = (e) => {
    if (
      creatingSubListForFolder &&
      !e.key.startsWith("create-agent-subfolder-") &&
      !e.key.startsWith("add-agent-subfolder-") &&
      e.key !== String(creatingSubListForFolder)
    ) {
      handleCancelAgentSubFolder();
    }
    if (
      creatingStandaloneAgentSubFolder &&
      e.key !== "create-standalone-agent-subfolder"
    ) {
      handleCancelStandaloneAgentSubFolder();
    }
    if (creatingAgentFolder && e.key !== "create-agent-folder") {
      handleCancelCreateAgentFolder();
    }
    const path = routesByKey[e.key];
    if (path) {
      navigate(path);
    }
  };

  // --- Modal UI (name-only) --- //
  const createAgentModal = (
    <Modal
      title="Create agent"
      open={createAgentModalOpen}
      okText="Create"
      confirmLoading={createAgentLoading}
      onOk={handleSubmitCreateAgentModal}
      onCancel={() => {
        if (!createAgentLoading) setCreateAgentModalOpen(false);
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xs opacity-70">Agent name</div>
        <Input
          autoFocus
          placeholder="e.g. My Agent"
          value={createAgentName}
          onChange={(e) => setCreateAgentName(e.target.value)}
          onPressEnter={() => {
            if (!createAgentLoading) handleSubmitCreateAgentModal();
          }}
        />
        <div className="text-xs opacity-60">
          Using default configuration for now.
        </div>
      </div>
    </Modal>
  );

  useEffect(() => {
    (async () => {
      await retrieveAgentFolder();
      await retrieveAgentSubFolder();
    })();
  }, []);

  function warningMessage() {
    if (!err) return null;
    return <p style={{ color: "crimson" }}>{err}</p>;
  }

  return (
    <>
      {createAgentModal}
      <div
        className="sideNavWrapper sideNavTopPanel"
        style={{ paddingTop: 12 }}
      >
        <div
          className="pl-4 pr-2 pb-10 flex flex-row items-center justify-between gap-2"
          style={{ fontStyle: "italic" }}
        >
          <span>Sally</span>
          <div className="flex items-center gap-2 shrink-0">
            <FolderAddOutlined
              onClick={handleCreateAgentFolderClick}
              className="plus-icon hover:bg-gray-100 dark:hover:bg-white/10 rounded-md cursor-pointer"
              aria-label="Add agent folder"
            />
            <RobotOutlined
              onClick={handleStandaloneAgentSubFolderRobotClick}
              className="plus-icon hover:bg-gray-100 dark:hover:bg-white/10 rounded-md cursor-pointer"
              aria-label="Add standalone agent session"
            />
          </div>
        </div>
        {warningMessage()}
        <Menu
          className=""
          key={`menu-${creatingSubListForFolder || creatingAgentFolder || creatingStandaloneAgentSubFolder || "none"}`}
          onClick={onClickHome}
          style={{ width: "100%" }}
          defaultSelectedKeys={["1"]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          mode="inline"
          items={[
            ...buildStandaloneAgentSubFolderMenuItems(agentSubFolder),
            ...(creatingStandaloneAgentSubFolder
              ? [
                  {
                    key: "create-standalone-agent-subfolder",
                    label: (
                      <Input
                        placeholder="New agent"
                        bordered={false}
                        value={newStandaloneAgentSubFolderName}
                        autoFocus
                        onChange={(e) =>
                          setNewStandaloneAgentSubFolderName(e.target.value)
                        }
                        onPressEnter={async (e) => {
                          e.stopPropagation();
                          enterPressedRef.current = true;
                          await handleCreateStandaloneAgentSubFolderInline();
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            if (!enterPressedRef.current) {
                              handleCancelStandaloneAgentSubFolder();
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
                  },
                ]
              : []),
            ...buildMenuItems(agentFolder, agentSubFolder),
            ...(creatingAgentFolder
              ? [
                  {
                    key: "create-agent-folder",
                    label: (
                      <Input
                        placeholder="New agent folder"
                        bordered={false}
                        value={newAgentFolderName}
                        autoFocus
                        onChange={(e) =>
                          setNewAgentFolderName(e.target.value)
                        }
                        onPressEnter={async (e) => {
                          e.stopPropagation();
                          enterPressedRef.current = true;
                          await handleCreateAgentFolderInline();
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            if (!enterPressedRef.current) {
                              handleCancelCreateAgentFolder();
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
                  },
                ]
              : []),
          ]}
        />
      </div>
    </>
  );
}
