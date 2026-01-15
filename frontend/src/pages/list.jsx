import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import { listList } from "../services/list";
import { createList } from "../services/list";
import { listFolder } from "../services/folder";
import { createFolder as createFolderApi } from "../services/folder";
import { Menu } from 'antd';
import { SideNavRoutes, SideNavData } from '../data/sideNavObject';
import "../styles/SideNav.css";

import React from 'react';
import { Card, Space } from 'antd';

export default function List () {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [folder, setFolder] = useState([]);
    const [list, setList] = useState([]); 
    const [form, setForm] = useState(""); 

    const routesByKey = SideNavRoutes;

  const onClick = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      window.location.href = path; // 👈 navigate
    }
  };

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
            // Folder data should populate the `folder` state, not `list`
            setFolder(data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retrieving folders");
        }
     }

     // Create a folder helper (not currently wired to UI)
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

     useEffect (() => {
        (async () => {
            await retrieveList();
            await retrieveFolder();
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
        <h1 className="font-bold text-xl">List</h1>
        <Menu
    className="sideNavWrapper"
      onClick={onClick}
      style={{ width: '100%' }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={SideNavData}
    />
                </div>
        </>
     )

}
