import api from "../api";

export async function listReminders(subListId) {
    const { data } = await api.get(`/reminders?subListId=${subListId}`);
    return data;
  }
  
  export async function createReminders(payload) {
    const { data } = await api.post("/reminders", payload);
    return data;
  }
