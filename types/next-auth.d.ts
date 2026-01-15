import { DefaultSession } from "next-auth";

// Extend session user type
declare module "next-auth" {
  export interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
