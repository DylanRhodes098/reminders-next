import api from "../api";

export async function listReminders () {
const {data} = await api.get ("/reminders");
return data;
}

export async function createReminders (payload) {
    const {data} = await api.post ("/reminders", payload);
    return data;
    }
    

