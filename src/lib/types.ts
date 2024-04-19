export enum Game {
  GENSHIN = "gi",
  STARRAIL = "hsr",
}

export const GAME_DESCRIPTION_MAP: { [key in Game]: string } = {
  [Game.GENSHIN]: "Genshin Impact",
  [Game.STARRAIL]: "Honkai: Star Rail",
} as const;

export const GAME_DICTIONARY_API_ENDPOINT_MAP: { [key in Game]: string } = {
  [Game.GENSHIN]: "https://gidict-api.pizzastudio.org/",
  [Game.STARRAIL]: "https://hsrdict-api.pizzastudio.org/",
} as const;

export enum ShowLanguage {
  ENGLISH = "en",
  CHINESE_SIMPLIFIED = "chs",
  CHINESE_TRADITIONAL = "cht",
  PORTUGUESE = "pt",
  JAPANESE = "jp",
  RUSSIAN = "ru",
  THAI = "th",
  GERMAN = "de",
  SPANISH = "es",
  INDONESIAN = "id",
  KOREAN = "kr",
  VIETNAMESE = "vi",
  FRENCH = "fr",
}

export const SHOW_LANGUAGE_DESCRIPTION_MAP: { [key in ShowLanguage]: string } =
  {
    [ShowLanguage.ENGLISH]: "English",
    [ShowLanguage.CHINESE_SIMPLIFIED]: "Chinese (Simplified)",
    [ShowLanguage.CHINESE_TRADITIONAL]: "Chinese (Traditional)",
    [ShowLanguage.PORTUGUESE]: "Portuguese",
    [ShowLanguage.JAPANESE]: "Japanese",
    [ShowLanguage.RUSSIAN]: "Russian",
    [ShowLanguage.THAI]: "Thai",
    [ShowLanguage.GERMAN]: "German",
    [ShowLanguage.SPANISH]: "Spanish",
    [ShowLanguage.INDONESIAN]: "Indonesian",
    [ShowLanguage.KOREAN]: "Korean",
    [ShowLanguage.VIETNAMESE]: "Vietnamese",
    [ShowLanguage.FRENCH]: "French",
  } as const;
