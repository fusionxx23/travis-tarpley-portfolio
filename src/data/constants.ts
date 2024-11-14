import dotenv from "dotenv";
dotenv.config();
export const DB_API_URL = process.env.AWS_URL as string;
