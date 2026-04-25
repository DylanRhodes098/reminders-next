// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// List all agent sub folders //
// »« - »« »« - »« »« - »« //
export async function listAgentSubFolder() {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // GET /agentSubFolders //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.get("/agentSubFolders");

  return data;
}

// »« - »« »« - »« »« - »« //
// List agent sub folders for one agent folder //
// »« - »« »« - »« »« - »« //
export async function listAgentSubFolderByAgentFolderId(agentFolderId) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // GET /agentSubFolders?agentFolderId= //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.get(
    `/agentSubFolders?agentFolderId=${encodeURIComponent(agentFolderId)}`
  );

  return data;
}

// »« - »« »« - »« »« - »« //
// Get one agent sub folder by id //
// »« - »« »« - »« »« - »« //
export async function getAgentSubFolderById(id) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // GET /agentSubFolders?id= //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.get(
    `/agentSubFolders?id=${encodeURIComponent(id)}`
  );

  return data;
}

// »« - »« »« - »« »« - »« //
// Create agent sub folder //
// »« - »« »« - »« »« - »« //
export async function createAgentSubFolder(payload) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // POST /agentSubFolders ({ name, agentFolderId }) //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.post("/agentSubFolders", payload);

  return data;
}

// »« - »« »« - »« »« - »« //
// Delete agent sub folder by id //
// »« - »« »« - »« »« - »« //
export async function deleteAgentSubFolder(id) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // DELETE /agentSubFolders?id= //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.delete(
    `/agentSubFolders?id=${encodeURIComponent(id)}`
  );

  return data;
}
