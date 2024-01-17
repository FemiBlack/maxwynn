import { JWT } from "@auth/core/jwt";
import type { NextAuthConfig } from "next-auth";
import { AuthUser } from "./app/lib/definitions";
import Spotify from "next-auth/providers/spotify";
import { LOGIN_URL } from "./app/lib/spotify";

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch("https://accounts.spotify.com/authorize", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      cache: "no-cache",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: refreshedTokens.expires_at,
      expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    };
  } catch (error) {
    console.error("referror=>", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Spotify({
      authorization: LOGIN_URL,
      profile: (profile) => {
        console.log(profile);
        return {
          id: profile.id,
          name: profile.display_name,
          image: profile.images,
          email: profile.email,
        };
      },
    }),
  ],
  session: { maxAge: 60 * 60 },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("auth=>", auth);

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, account }) {
      console.log("account=>", account);

      if (!account) {
        return token;
      }

      const updatedToken = {
        ...token,
        access_token: account?.access_token,
        token_type: account?.token_type,
        expires_at: account?.expires_at ?? Date.now() / 1000,
        expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: account?.refresh_token,
        scope: account?.scope,
        id: account?.providerAccountId,
      };

      if (Date.now() < updatedToken.expires_at) {
        return refreshAccessToken(updatedToken);
      }

      return updatedToken;
    },
    session({ session, token }: { session: any; token: any }) {
      console.log("token=>", token);
      console.log("sessure=>", session);

      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      };
      session.user = user;
      session.error = token.error;
      return session;
    },
  },
} satisfies NextAuthConfig;
