import api from "../api";

export async function listReminders(subListId) {
    const { data } = await api.get(`/sublists/${subListId}/reminders`);
    return data;
  }
  
  export async function createReminders(payload) {
    const { data } = await api.post("/reminders", payload);
    return data;
  }
