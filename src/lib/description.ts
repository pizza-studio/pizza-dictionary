import { ParseKeys } from "i18next";
import { Game, ShowLanguage } from "./types";

export const GAME_DESCRIPTION_I18N_KEY_MAP: { [key in Game]: ParseKeys } = {
  [Game.GENSHIN]: "General.Genshin",
  [Game.STARRAIL]: "General.HSR",
} as const;

export const SHOW_LANGUAGE_DESCRIPTION_I18N_KEY_MAP: {
  [key in ShowLanguage]: ParseKeys;
} = {
  [ShowLanguage.ENGLISH]: "General.Language.en",
  [ShowLanguage.CHINESE_SIMPLIFIED]: "General.Language.chs",
  [ShowLanguage.CHINESE_TRADITIONAL]: "General.Language.cht",
  [ShowLanguage.PORTUGUESE]: "General.Language.pt",
  [ShowLanguage.JAPANESE]: "General.Language.jp",
  [ShowLanguage.RUSSIAN]: "General.Language.ru",
  [ShowLanguage.THAI]: "General.Language.th",
  [ShowLanguage.GERMAN]: "General.Language.de",
  [ShowLanguage.SPANISH]: "General.Language.es",
  [ShowLanguage.INDONESIAN]: "General.Language.id",
  [ShowLanguage.KOREAN]: "General.Language.kr",
  [ShowLanguage.VIETNAMESE]: "General.Language.vi",
  [ShowLanguage.FRENCH]: "General.Language.fr",
} as const;

export const QUERY_PLACEHOLDER_MAP: { [key in Game]: ParseKeys } = {
  [Game.GENSHIN]: "Search.Index.Placeholder.Genshin",
  [Game.STARRAIL]: "Search.Index.Placeholder.HSR",
} as const;
