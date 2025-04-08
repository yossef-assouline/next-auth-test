import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import dotenv from "dotenv";

dotenv.config();

interface TokenData {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as TokenData;
        return decoded.id;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}
