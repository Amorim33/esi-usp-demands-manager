import { execSync } from "child_process";

export const setup = async () => {
  const url =
    process.env.DATABASE_URL ??
    "postgres://demands-manager:demands-manager@localhost:54321/demands-manager";
  process.env.DATABASE_URL = url;

  execSync(`DATABASE_URL=${url} pnpm push`, {
    stdio: "inherit",
  });
};
