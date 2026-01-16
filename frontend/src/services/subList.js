import api from "../api";

export async function listSubList () {
const {data} = await api.get ("/subLists");
return data;
}

export async function createSubList (payload) {
    const {data} = await api.post ("/subLists", payload);
    console.log("FRONTEND PAYLOAD:", payload);
    return data;
    
    }
    
    export async function getSubListById(id) {
        const { data } = await api.get(`/subLists?id=${id}`);
        return data;
      }

      export async function deleteSubList(id) {
        const { data } = await api.delete(`/subLists?id=${id}`);
        return data;
      }