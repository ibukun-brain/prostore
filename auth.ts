import NextAuth, { NextAuthConfig, Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        // Check if user exists and password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          //   If password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
          // If user does not exist or password does not match return null;
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      // Set the user Id from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //   If there is an update, set the username
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: any) {
      // Assign the user fields to token
      if (user) {
        token.role = user.role;

        // If user has not name then use the email
        if (user.name === "NO_NAME") {
          token.name = user.email.split("@")[0];

          // Update database to reflect the token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      if (trigger === "signIn" || trigger === "signup") {
        const cookiesObject = await cookies();
        const sessionCartId = cookiesObject.get("sessionCartId")?.value;

        if (sessionCartId) {
          const sessionCart = await prisma.cart.findFirst({
            where: { sessionCartId },
          });

          if (sessionCart) {
            // Assign new cart
            await prisma.cart.update({
              where: {
                id: sessionCart.id,
              },
              data: { userId: user.id },
            });
          }
        }
      }
      
      // Handle session updates
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }
      return token;
    },
    async authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      // Array of regex patterns of paths want to protect
      const protectPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-holder/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];
      // Get pathname from req URL object
      const { pathname } = request.nextUrl;

      // Check if user is not authenticated and accessing a protected a path
      if (!auth && protectPaths.some((p) => p.test(pathname))) return false;

      const response = NextResponse.next();
      if (!request.cookies.get("sessionCartId")) {
        // Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();
        response.cookies.set({
          name: "sessionCartId",
          value: sessionCartId,
          path: "/",
        });
      }

      return response;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
