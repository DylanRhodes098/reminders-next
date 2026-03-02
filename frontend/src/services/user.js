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
    const {data} = await api.get(`/user${userId}` );

    // < - return fetched data to the frontend - > //
    return data;
}