"use server";

import sdk from "./sdk";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { Limit, TimeRange } from "./definitions";
import { ItemTypes } from "@spotify/web-api-ts-sdk";

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

export const getRecommendations = async ({
  artists,
  genres,
  tracks,
}: {
  artists?: string[];
  genres?: string[];
  tracks?: string[];
}) => {
  return sdk.recommendations.get({
    seed_artists: artists,
    seed_genres: genres,
    seed_tracks: tracks,
  });
};

export const searchItems = async ({
  query,
  types,
  limit = 5,
}: {
  query: string;
  types: ItemTypes[];
  limit?: Limit;
}) => {
  if (!query) return;
  return sdk.search(query, types, undefined, limit);
};

export const createPlaylist = async () => {
  const session = await auth();
  if (!session || !session.user) return;
  return sdk.playlists.createPlaylist(session.user.id, {
    name: "Max Wynn Recommendations",
    public: false,
  });
};

export const saveAsPlaylist = async (uris: string[]) => {
  const playlist = await createPlaylist();
  if (!playlist) return;
  return sdk.playlists.addItemsToPlaylist(playlist.id, uris);
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
