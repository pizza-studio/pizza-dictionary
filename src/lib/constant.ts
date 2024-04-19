import { Game } from "./types";

export const GAME_DICTIONARY_API_ENDPOINT_MAP: { [key in Game]: string } = {
  [Game.GENSHIN]: "https://gidict-api.pizzastudio.org/",
  [Game.STARRAIL]: "https://hsrdict-api.pizzastudio.org/",
} as const;
