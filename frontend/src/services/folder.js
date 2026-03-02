// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// List Folder Function that gets the listFolder data from the backend //
// »« - »« »« - »« »« - »« //
export async function listFolder () {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // get data (folders) from the backend api -> app -> folder -> get function //
  // @ - @ @ - @ @ - @ //
const {data} = await api.get("/folder");

return data;
}

// »« - »« »« - »« »« - »« //
// Create Folder Function that creates Folder data in the backend //
// »« - »« »« - »« »« - »« //
export async function createFolder (payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // add data (folders) from the backend api -> app -> folder -> post function //
  // @ - @ @ - @ @ - @ //
    const {data} = await api.post ("/folder", payload);

    return data;
    }
    
    // »« - »« »« - »« »« - »« //
// delete Folder Function that deletes speciifc Folder data from the backend //
// »« - »« »« - »« »« - »« //
    export async function deleteFolder(id) {

      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      // GateKeeper //
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

      // @ - @ @ - @ @ - @ //
      // Delete data (folders) from the backend api -> app -> folder -> delete function //
      // Where the url id matches the folder id //
      // @ - @ @ - @ @ - @ //
        const { data } = await api.delete(`/folder?id=${id}`);

    
        return data;
      }

