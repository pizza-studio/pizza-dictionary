import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { GAME_DESCRIPTION_MAP, Game } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { atom, useAtom } from "jotai";

const QUERY_PLACEHOLDER_MAP = {
  [Game.GENSHIN]: "Mondstadt, Venti, Sweet Flower...",
  [Game.STARRAIL]: "Herta Space Station, Himeko, Calyx...",
} as const;

const queryAtom = atom("");

export const Route = createLazyFileRoute("/$game/_layout/")({
  component: Index,
});

function Index() {
  const [query, setQuery] = useAtom(queryAtom);

  const navigate = useNavigate();

  const { game }: { game: Game } = Route.useParams();
  const gameDescription = GAME_DESCRIPTION_MAP[game];

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
      <div className="text-center">
        <h3 className="text-xl text-muted-foreground">
          Searching Dictionary in
        </h3>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {gameDescription}
        </h1>
      </div>
      <form className="pt-7 mx-5 w-full" onSubmit={handleSubmit}>
        <Input
          className="basis"
          placeholder={QUERY_PLACEHOLDER_MAP[game]}
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
