import api from "../api";

export async function listReminderFolder(subListId) {
  const url = subListId ? `/reminderFolder?subListId=${subListId}` : "/reminderFolder";
  const {data} = await api.get(url);
  return data;
}

export async function createReminderFolder (payload) {
    const {data} = await api.post ("/reminderFolder", payload);
    return data;
}

export async function updateReminderFolder (payload) {
    const {data} = await api.put ("/reminderFolder", payload);
    return data;
}

export async function deleteReminderFolder(id) {
    const { data } = await api.delete(`/reminderFolder?id=${id}`);
    return data;
}
