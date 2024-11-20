import { drizzle } from "drizzle-orm/libsql";
import { config } from "dotenv";

config();
export const db = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
});
