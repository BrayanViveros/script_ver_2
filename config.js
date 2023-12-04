import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 7000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/script_v3";

  export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
