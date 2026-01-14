import api from "../api";

export async function listSubList () {
const {data} = await api.get ("/subLists");
return data;
}

export async function createSubList (payload) {
    const {data} = await api.post ("/subLists", payload);
    return data;
    }
    

