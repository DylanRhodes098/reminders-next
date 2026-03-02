// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// List Sublist Function that gets all subLists //
// »« - »« »« - »« »« - »« //
export async function listSubList () {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // Uber to get subLists via GET /subList //
  // @ - @ @ - @ @ - @ //
const {data} = await api.get ("/subLists");

  // < - return fetched data to the frontend - > //
return data;
}

// »« - »« »« - »« »« - »« //
// Create subList Function that uses new payload //
// »« - »« »« - »« »« - »« //
export async function createSubList (payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // Uber new payload via POST /subList //
  // @ - @ @ - @ @ - @ //
    const {data} = await api.post ("/subLists", payload);

    // < - Log payload - > //
    console.log("FRONTEND PAYLOAD:", payload);

  // < - return fetched data to the frontend - > //
    return data;
    }
    
    // »« - »« »« - »« »« - »« //
// subList Function that gets one subList using id //
// »« - »« »« - »« »« - »« //
    export async function getSubListById(id) {

      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      // GateKeeper //
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

      // @ - @ @ - @ @ - @ //
      // Uber find subList via GET / subList id //
      // @ - @ @ - @ @ - @ //
        const { data } = await api.get(`/subLists?id=${id}`);

      // < - return fetched data to the frontend - > //
        return data;
      }

      // »« - »« »« - »« »« - »« //
// subList Function that deletes a subList by id //
// »« - »« »« - »« »« - »« //
      export async function deleteSubList(id) {

        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
        // GateKeeper //
        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

        // @ - @ @ - @ @ - @ //
        // Uber find subList via DELETE / subList id //
        // @ - @ @ - @ @ - @ //
        const { data } = await api.delete(`/subLists?id=${id}`);

        // < - return fetched data to the frontend - > //
        return data;
      }