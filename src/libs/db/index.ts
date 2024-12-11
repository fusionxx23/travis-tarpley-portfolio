import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
  connection: {
    url: import.meta.env.TURSO_CONNECTION_URL as string,
    authToken: import.meta.env.TURSO_AUTH_TOKEN as string,
  },
});
