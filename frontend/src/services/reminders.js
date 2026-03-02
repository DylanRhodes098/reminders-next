// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// List Reminder Function that gets all reminders in the subList //
// »« - »« »« - »« »« - »« //
export async function listReminders(subListId) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // < - If subList Id - > //
  const url = subListId

  // * * * //
  // equals a url with an existing subListId //
  // * * * //
    ? `/reminders?subListId=${subListId}`

  // < * * else just plain reminders url * * > //
    : "/reminders";

  // @ - @ @ - @ @ - @ //
  // uber the subListId to get the reminders for that subList //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.get(url);

  // < - return fetched data to the frontend - > //
  return data;
}

// »« - »« »« - »« »« - »« //
// Create Reminder Function that creates a new key value reminder in an existing folder //
// »« - »« »« - »« »« - »« //
  export async function createReminders(payload) {

    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    // GateKeeper //
    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

    // @ - @ @ - @ @ - @ //
    // uber new reminder data to backend via POST /reminders //
    // @ - @ @ - @ @ - @ //
    const { data } = await api.post("/reminders", payload);

    // < - return fetched data to the frontend - > //
    return data;
  }

  // »« - »« »« - »« »« - »« //
// delete Reminder Function using reminder id //
// »« - »« »« - »« »« - »« //
  export async function deleteReminders(id) {

    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    // GateKeeper //
    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

    // * * * //
    // if no id //
    // * * * //
    if (!id)

      // < - return error - > //
      throw new Error("Missing reminder id");

    // @ - @ @ - @ @ - @ //
    // else uber reminder id ad delete the reminder via DELETE /reminder //
    // @ - @ @ - @ @ - @ //
    const { data } = await api.delete("/reminders", { params: { id } });

    // < - return fetched data to the frontend - > //
    return data;
  }
  
  // »« - »« »« - »« »« - »« //
// Update Reminder Function using both id ad payload //
// »« - »« »« - »« »« - »« //
  export async function updateReminders(id, payload) {

    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    // GateKeeper //
    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

    // @ - @ @ - @ @ - @ //
    // uber the whole payload of that reminder via PUT /remider //
    // @ - @ @ - @ @ - @ //
    const { data } = await api.put("/reminders", { id, ...payload });

    // < - return fetched data to the frontend - > //
    return data;
  }

  

