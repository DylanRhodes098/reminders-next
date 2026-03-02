// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Backend imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// List List Function that gets the list data from the backend //
// »« - »« »« - »« »« - »« //
export async function listList () {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // get data (list) from the backend api -> app -> list -> get function //
  // @ - @ @ - @ @ - @ //
const {data} = await api.get ("/list");
return data;
}

// »« - »« »« - »« »« - »« //
// Create List Function that creates List data in the backend //
// »« - »« »« - »« »« - »« //
export async function createList (payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // add data (list) from the backend api -> app -> list -> post function //
  // @ - @ @ - @ @ - @ //
    const {data} = await api.post ("/list", payload);
    return data;
    }
    

