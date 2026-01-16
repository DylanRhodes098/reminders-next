import api from "../api";

export async function listFolder () {
const {data} = await api.get ("/folder");
return data;
}

export async function createFolder (payload) {
    const {data} = await api.post ("/folder", payload);
    return data;
    }
    
    export async function deleteFolder(id) {
        const { data } = await api.delete(`/folder?id=${id}`);
        return data;
      }

