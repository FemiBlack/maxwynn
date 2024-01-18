const scope = [
  "user-read-currently-playing",
  "playlist-read-collaborative",
  "user-follow-read",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private",
].join(",");

const queryParamsString = new URLSearchParams({
  scope,
});

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`;
