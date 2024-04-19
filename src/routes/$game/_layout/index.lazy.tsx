import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Game } from "@/lib/types";
import { GAME_DESCRIPTION_I18N_KEY_MAP } from "@/lib/description";
import { Input } from "@/components/ui/input";
import { atom, useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { QUERY_PLACEHOLDER_MAP } from "@/lib/description";

const queryAtom = atom("");

export const Route = createLazyFileRoute("/$game/_layout/")({
  component: Index,
});

function Index() {
  const [query, setQuery] = useAtom(queryAtom);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { game }: { game: Game } = Route.useParams();
  const gameDescriptionI18nKey = GAME_DESCRIPTION_I18N_KEY_MAP[game];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    navigate({
      to: "/$game/search/$word",
      params: {
        game: game,
        word: query,
      },
    });
  };

  return (
    <div className="flex flex-col pt-32 justify-center items-center space-y-6 max-w-screen-sm mx-auto px-6">
      <div className="text-center space-y-3">
        <h3 className="text-xl text-muted-foreground">
          {t("Search.Index.SearchIn")}
        </h3>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t(gameDescriptionI18nKey)}
        </h1>
      </div>
      <form className="pt-7 mx-5 w-full" onSubmit={handleSubmit}>
        <Input
          className="basis"
          placeholder={t(QUERY_PLACEHOLDER_MAP[game])}
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
