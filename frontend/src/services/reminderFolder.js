// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";


// »« - »« »« - »« »« - »« //
// List Reminder Folder Function that gets the reminder folder data from the backend //
// »« - »« »« - »« »« - »« //
export async function listReminderFolder(subListId) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // < - define url as if subListId - > //
  const url = subListId 

  // * * * //
  // equals a url with a subListId parameter //
  // * * * //
  ? `/reminderFolder?subListId=${subListId}` 

  // < * * else just reminderFolder url * * > //
  : "/reminderFolder";

  // @ - @ @ - @ @ - @ //
  // uber data (url) to get from backend //
  // @ - @ @ - @ @ - @ //
  const {data} = await api.get(url);

  return data;
}

// »« - »« »« - »« »« - »« //
// List Reminder Folder Function that adds a Folder to the backend //
// »« - »« »« - »« »« - »« //
export async function createReminderFolder (payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // uber new reminder folder data to backend via POST /reminderFolder //
  // @ - @ @ - @ @ - @ //
    const {data} = await api.post ("/reminderFolder", payload);
    return data;
}

// »« - »« »« - »« »« - »« //
// List Reminder Folder Function that edits a Folder to the backend //
// »« - »« »« - »« »« - »« //
export async function updateReminderFolder (payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // uber edited reminder folder data to backend via PUT /reminderFolder //
  // @ - @ @ - @ @ - @ //
    const {data} = await api.put ("/reminderFolder", payload);
    return data;
}

// »« - »« »« - »« »« - »« //
// List Reminder Folder Function that deletes a Folder to the backend //
// »« - »« »« - »« »« - »« //
export async function deleteReminderFolder(id) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // uber deleted reminder folder data to backend via DELETE /reminderFolder //
  // @ - @ @ - @ @ - @ //
    const { data } = await api.delete(`/reminderFolder?id=${id}`);

    return data;
}
