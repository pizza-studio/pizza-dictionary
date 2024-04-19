import { createFileRoute } from "@tanstack/react-router";
import { Game, ShowLanguage } from "@/lib/types";
import { GAME_DICTIONARY_API_ENDPOINT_MAP } from "@/lib/constant";

export const Route = createFileRoute("/$game/_layout/search/$word")({
  validateSearch: (search) =>
    search as {
      page: number | undefined;
    },
  loaderDeps: ({ search: { page } }) => ({
    page: page != undefined ? page : 1,
  }),
  loader: async ({ deps: { page }, params: { game, word } }) => {
    console.log(game, word, page);
    const endPoint = GAME_DICTIONARY_API_ENDPOINT_MAP[game as Game];
    const api = `v1/translations/${word}?`;
    const res = await fetch(`${endPoint}${api}page=${page}&page_size=20`);
    const data = (await res.json()) as Result;
    console.log(data);
    return data;
  },
});

type Result = {
  total_page: number;
  results: {
    vocabulary_id: number;
    target: string;
    target_lang: ShowLanguage;
    lan_dict: {
      [key: string]: string;
    };
  }[];
};
