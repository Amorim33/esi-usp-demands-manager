import postgres from "postgres";
import { env } from "./env";

export const sql = postgres(env.DATABASE_URL, {
  transform: postgres.camel,
  max: 1,
  idle_timeout: 0,
  connect_timeout: 3000,
});
