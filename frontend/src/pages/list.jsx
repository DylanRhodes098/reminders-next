import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import { listList } from "../services/list";
import { createList } from "../services/list";
import { listFolder } from "../services/folder";
import { createFolder as createFolderApi } from "../services/folder";

import React from 'react';
import { Card, Space } from 'antd';

export default function List () {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [folder, setFolder] = useState([]);
    const [list, setList] = useState([]); 
    const [form, setForm] = useState(""); 

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
        <Space className="w-full" orientation="vertical" size={16}>
    <Card title="List" extra={<a href="#">More</a>} style={{ }}>
    {warningMessage()}
            <ul className="mt-4">
                {Array.isArray(folder) && folder.length > 0 ? (
                    folder.map((f) => (
                        <div key={f.id}>
                        <li className="text-lg">Folder:{f.name}</li>
                        </div>
                    ))
                ) : (
                    <li className="text-sm text-gray-500">No folders loaded</li>
                )}
            </ul><br></br>
            </Card>
            </Space>
                </div>
        </>
     )

}
