import api from "../api";

export async function listList () {
const {data} = await api.get ("/list");
return data;
}

export async function createList (payload) {
    const {data} = await api.post ("/list", payload);
    return data;
    }
    

