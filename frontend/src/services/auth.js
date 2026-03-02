// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Axios imports - > //
import api from "../api";

// »« - »« »« - »« »« - »« //
// Login Function using email and password
// »« - »« »« - »« »« - »« //
export async function login({ email, password }) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // Uber data object (defined with email and password) to the backend user -> login -> post function //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.post("/user/login", { email, password });

  // * * * //
  // if data has been added //
  // * * * //
  if (data) {

    // < - add a key value pair to the browser database - > //
    sessionStorage.setItem("authToken", data);

    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    // Hub //
    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    try {

      // < - Define payload by retreiving the payload from the token, converting base64 language into a javascript object - > //
      const payload = JSON.parse(atob(data.split('.')[1]));

      // * * * //
      // If the payload id exists //
      // * * * //
      if (payload.id) {

        // < - Create and add a key value pair to the payload object - > //
        sessionStorage.setItem("id", payload.id);
      }

      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
      // Departure //
      // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    } catch (e) {

      // * * * //
      // If token decoding fails, continue anyway //
      // * * * //
      console.warn("Could not decode token:", e);
    }
  }

  // < - return data allows the developer to use the backend response however they like on the frontend, and shows the user the login was successful - > //
  return data;
}


// »« - »« »« - »« »« - »« //
// Register Function using email full name and password //
// »« - »« »« - »« »« - »« //
export async function register({ full_name, email, password }) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // GateKeeper //
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //

  // @ - @ @ - @ @ - @ //
  // Uber data object (defined with email, full name and password) to the backend user -> register -> post function //
  // @ - @ @ - @ @ - @ //
  const { data } = await api.post("/user/register", { full_name, email, password });

  // < - return data allows the developer to use the backend response however they like on the frontend, and shows the user the login was successful - > //
  return data;
}

// »« - »« »« - »« »« - »« //
// Logout Function 
// »« - »« »« - »« »« - »« //
export function logout() {

  // < - Remove authtoken and id form the object in the browser database - > //
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("id");
}
