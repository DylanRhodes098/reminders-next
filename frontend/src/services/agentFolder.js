// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// List agent folders from the backend //
// »« - »« »« - »« »« - »« //
// includeNested: when true, GET includes nested agentSubFolders //
export async function listAgentFolder(includeNested = false) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // GET /api/agentFolder or ?include=agentSubFolders //
  // @ - @ @ - @ @ - @ //
  const url = includeNested
    ? "/agentFolder?include=agentSubFolders"
    : "/agentFolder";

  const { data } = await api.get(url);

  return data;
}

// »« - »« »« - »« »« - »« //
// Create agent folder in the backend //
// »« - »« »« - »« »« - »« //
export async function createAgentFolder(payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // POST /agentFolder (JWT required) //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.post("/agentFolder", payload);

  return data;
}

// »« - »« »« - »« »« - »« //
// Update agent folder //
// »« - »« »« - »« »« - »« //
export async function updateAgentFolder(payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // PUT /agentFolder //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.put("/agentFolder", payload);

  return data;
}

// »« - »« »« - »« »« - »« //
// Delete agent folder by id //
// »« - »« »« - »« »« - »« //
export async function deleteAgentFolder(id) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // DELETE /agentFolder?id= //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.delete(`/agentFolder?id=${id}`);

  return data;
}
