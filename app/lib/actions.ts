"use server";

import sdk from "./sdk";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { Limit, TimeRange } from "./definitions";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token || "",
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async ({
  offset,
  limit,
  timeRange,
}: {
  offset?: number;
  limit?: Limit;
  timeRange?: TimeRange;
}) => {
  return sdk.currentUser.topItems("tracks", timeRange, limit, offset);
};

export const getTopArtists = async ({
  offset,
  limit,
  timeRange,
}: {
  offset?: number;
  limit?: Limit;
  timeRange?: TimeRange;
}) => {
  return sdk.currentUser.topItems("artists", timeRange, limit, offset);
};

export async function authenticate() {
  try {
    await signIn("spotify");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
