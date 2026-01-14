import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import { listList } from "../services/list";
import { createList } from "../services/list";
import { listFolder} from "../services/folder";
import { createFolder } from "../services/folder";

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
            setList(data);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed retriveing")
        }
     }

     async function createFolder (e) {
        e.preventDefualt();
        setErr("");
        try {
            const payload = {name};
            const data = await createFolder(payload);
            setProfile(currentList => [...currentList, data]);
        } catch (error) {
            setErr(error?.response?.data?.error || "failed creating");
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
        <Space direction="vertical" size={16}>
    <Card title="Folder" extra={<a href="#">More</a>} style={{ }}>
    {warningMessage()}
            <ul className="mt-4">
                {Array.isArray(folder) && folder.length > 0 ? (
                    folder.map((g) => (
                        <div key={g.id}>
                        <li className="text-lg">Folder:{g.name}</li>
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
