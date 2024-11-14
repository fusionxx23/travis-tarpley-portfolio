import dotenv from "dotenv";
dotenv.config();
export const DB_API_URL = process.env.AWS_URL as string;
export const BEARER = process.env.BEARER as string;
