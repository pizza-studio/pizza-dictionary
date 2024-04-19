import {
  createFileRoute,
  Outlet,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import {
  Game,
  GAME_DESCRIPTION_MAP,
  ShowLanguage,
  SHOW_LANGUAGE_DESCRIPTION_MAP,
} from "@/lib/types";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { atom, useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
  BookA,
  ChevronsUpDown,
  Languages,
  Moon,
  Sun,
  SunMoon,
} from "lucide-react";
import { useTheme, Theme } from "@/components/ThemeProvider";

export const Route = createFileRoute("/$game/_layout")({
  component: Component,
});

function Component() {
  return (
    <div>
      <nav className="max-w-screen-sm flex items-center justify-between mx-auto px-6 py-2 flex-nowrap">
        <Link to="/" className="text-2xl font-semibold whitespace-nowrap">
          Pizza Dictionary
        </Link>
        <div className="flex flex-row flex-nowrap space-x-2 items-center justify-between">
          <div className="hidden sm:block">
            <GamePicker />
          </div>
          <DropDownMenu />
        </div>
      </nav>
      <Separator />
      <Outlet />
    </div>
  );
}

const popoverPopedAtom = atom(false);

function GamePicker() {
  const navigate = useNavigate();

  const { game: currentGame }: { game: Game } = Route.useParams();

  const gameDescription = GAME_DESCRIPTION_MAP[currentGame];

  const [popoverPoped, setPopoverPoped] = useAtom(popoverPopedAtom);

  return (
    <Popover open={popoverPoped} onOpenChange={setPopoverPoped}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={popoverPoped}
          className="max-w-screen-sm justify-between"
        >
          <p>{gameDescription}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {Object.values(Game).map((game) => (
                <CommandItem
                  key={game}
                  value={game}
                  onSelect={() => {
                    if (currentGame !== game) {
                      navigate({ to: "/$game", params: { game } });
                    }
                    setPopoverPoped(false);
                  }}
                >
                  {GAME_DESCRIPTION_MAP[game as Game]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Github, Menu } from "lucide-react";
import { showLanguagesAtom } from "@/lib/atom";

function DropDownMenu() {
  const navigate = useNavigate();

  const { game: currentGame }: { game: Game } = Route.useParams();

  const [showingLangauges, setShowLanguages] = useAtom(showLanguagesAtom);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="-pr-10">
          <Menu className="h-5 w-5 shrink-0 opacity-80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={currentGame}
          onValueChange={(newGame) => {
            navigate({ to: "/$game", params: { game: newGame } });
          }}
          className="block sm:hidden"
        >
          {Object.values(Game).map((game) => (
            <DropdownMenuRadioItem value={game} key={game}>
              {GAME_DESCRIPTION_MAP[game as Game]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator className="block sm:hidden" />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BookA className="mr-2 h-4 w-4" />
            <span>Result Language</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {Object.values(ShowLanguage).map((language) => (
                <DropdownMenuCheckboxItem
                  key={language}
                  checked={showingLangauges.includes(language)}
                  onSelect={(e) => {
                    e.preventDefault();
                    setShowLanguages((prev) =>
                      prev.includes(language)
                        ? prev.filter((lang) => lang !== language)
                        : [...prev, language]
                    );
                  }}
                >
                  {SHOW_LANGUAGE_DESCRIPTION_MAP[language]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-4 w-4" />
              <span>Languages</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Not implemented</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon className="mr-2 h-4 w-4" />
              <span>Appreance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ThemePicker />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="https://github.com/pizza-studio/pizza-dictionary"
            target="_blank"
          >
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemePicker() {
  const [theme, setTheme] = useTheme();

  return (
    <DropdownMenuRadioGroup
      value={theme}
      onValueChange={(value) => setTheme(value as Theme)}
    >
      <DropdownMenuRadioItem value={"light" as Theme}>
        <Sun className="mr-2 h-4 w-4" />
        Light
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value={"dark" as Theme}>
        <Moon className="mr-2 h-4 w-4" />
        Dark
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value={"system" as Theme}>
        <SunMoon className="mr-2 h-4 w-4" />
        System
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}
