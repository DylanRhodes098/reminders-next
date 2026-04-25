// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// UserData Function that gets a user by id //
// »« - »« »« - »« »« - »« //
export async function userData(userId) {

    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    // GateKeeper //
    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

    // @ - @ @ - @ @ - @ //
    // Uber find user via GET / user id //
    // @ - @ @ - @ @ - @ //
    // Backend currently exposes GET /api/user (all users).
    // If a userId is provided, find that user in the returned list.
    const { data } = await api.get(`/user`);

    if (!userId) return data;
    if (!Array.isArray(data)) return null;

    return data.find((u) => String(u?.id) === String(userId)) || null;
}

export async function updateUser(userId, body) {
    const { data } = await api.put(`/user/update/${userId}`, body);
    return data;
}