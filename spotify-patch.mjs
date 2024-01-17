// Add 'cache: no-cache' to fetch requests from @spotify-web-api-ts-sdk package to refresh tokens
// Related Issue: https://github.com/spotify/spotify-web-api-ts-sdk/issues/64

import fs from "node:fs/promises";

const spotifyApiDistPath = "./node_modules/@spotify/web-api-ts-sdk/dist";
const spotifyApiMjsPath = `${spotifyApiDistPath}/mjs/auth/ClientCredentialsStrategy.js`;
const spotifyApiCjsPath = `${spotifyApiDistPath}/cjs/auth/ClientCredentialsStrategy.js`;
const paths = [spotifyApiMjsPath, spotifyApiCjsPath];

const patch = async (path) => {
  const content = await fs.readFile(path, "utf-8");
  await fs.writeFile(
    path,
    content.replace(
      /body: bodyAsString\s/g,
      `body: bodyAsString, cache: 'no-store'`
    )
  );
};

paths.forEach(patch);

console.log("Patched Spotify API");
