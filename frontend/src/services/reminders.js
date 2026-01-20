import api from "../api";

export async function listReminders(subListId) {
  const url = subListId
    ? `/reminders?subListId=${subListId}`
    : "/reminders";

  const { data } = await api.get(url);
  return data;
}

  
  export async function createReminders(payload) {
    const { data } = await api.post("/reminders", payload);
    return data;
  }

  export async function deleteReminders(id) {
    const { data } = await api.delete(`/reminders?id=${id}`);
    return data;
  }



