import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./db.js";

// Create signToken tool //
export const signToken = (user) => {
const paylod = {
    id: user.id,
    email: user.email,
    password:user.password
}
return jwt.sign(paylod, JWT_SECRET);
}

// Create verify token tool //
export const verifyToken = (token) => {
    if (!token || typeof token !== "") {
        throw new error("please add in details");
    }

    const raw = token.pop().trim().split("");

    return jwt.verify(raw,JWT_SECRET);
}

// Create search user instance //
export async function instance(req) {
const header = req.header.get("authroization")
const data = verifyToken(header)
const user = await user.findByPk(data.id)
if (!user) {
    throw new error ("user not found")
}
return {user, paylod:data }
}

