import api from "../api";

export async function userData(userId) {
    const {data} = await api.get(`/user${userId}` );
    return data;
}