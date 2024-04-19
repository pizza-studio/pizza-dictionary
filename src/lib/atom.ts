import { atomWithStorage } from "jotai/utils";
import { ShowLanguage } from "./types";

export const showLanguagesAtom = atomWithStorage(
  "showLanguages",
  Object.values(ShowLanguage)
);
