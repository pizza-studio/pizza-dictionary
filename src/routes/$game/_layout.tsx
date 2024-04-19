import {
  createFileRoute,
  Outlet,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Game, ShowLanguage } from "@/lib/types";
import {
  GAME_DESCRIPTION_I18N_KEY_MAP,
  SHOW_LANGUAGE_DESCRIPTION_I18N_KEY_MAP,
} from "@/lib/description";
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
  const { t } = useTranslation();
  return (
    <div>
      <nav className="max-w-screen-sm flex items-center justify-between mx-auto px-6 py-2 flex-nowrap">
        <Link to="/" className="text-2xl font-semibold whitespace-nowrap">
          {t("General.AppName")}
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { game: currentGame }: { game: Game } = Route.useParams();

  const gameDescription = GAME_DESCRIPTION_I18N_KEY_MAP[currentGame];

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
          <p>{t(gameDescription)}</p>
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
                  {t(GAME_DESCRIPTION_I18N_KEY_MAP[game as Game])}
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
import { useTranslation } from "react-i18next";

function DropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="-pr-10">
          <Menu className="h-5 w-5 shrink-0 opacity-80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownGamePicker />
        <TargetLanguageSelector />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LanguagePicker />
          <ThemePicker />
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

import {
  SupportedLanguage,
  supportedLanguages,
  getFallbackLanguage,
} from "@/i18n/i18n";

function LanguagePicker() {
  const { t, i18n } = useTranslation();

  const LANGUAGE_I18N_KEY_MAP = {
    "zh-Hans": "简体中文",
    en: "English",
  } as const satisfies { [key in SupportedLanguage]: string };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Languages className="mr-2 h-4 w-4" />
        <span>{t("Search.Language.Trigger")}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={getFallbackLanguage(i18n.language)}
            onValueChange={(value) =>
              i18n.changeLanguage(value as SupportedLanguage)
            }
          >
            {supportedLanguages.map((language) => (
              <DropdownMenuRadioItem
                key={language}
                value={language as SupportedLanguage}
              >
                {LANGUAGE_I18N_KEY_MAP[language as SupportedLanguage]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function DropdownGamePicker() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { game: currentGame }: { game: Game } = Route.useParams();

  return (
    <div className="block sm:hidden">
      <DropdownMenuRadioGroup
        value={currentGame}
        onValueChange={(newGame) => {
          navigate({ to: "/$game", params: { game: newGame } });
        }}
      >
        {Object.values(Game).map((game) => (
          <DropdownMenuRadioItem value={game} key={game}>
            {t(GAME_DESCRIPTION_I18N_KEY_MAP[game as Game])}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
      <DropdownMenuSeparator />
    </div>
  );
}

function TargetLanguageSelector() {
  const { t } = useTranslation();
  const [showingLangauges, setShowLanguages] = useAtom(showLanguagesAtom);
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <BookA className="mr-2 h-4 w-4" />
        <span>{t("Search.Setting.ResultLanguage")}</span>
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
              {t(SHOW_LANGUAGE_DESCRIPTION_I18N_KEY_MAP[language])}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function ThemePicker() {
  const { t } = useTranslation();
  const [theme, setTheme] = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {
          {
            light: <Sun className="mr-2 h-4 w-4" />,
            dark: <Moon className="mr-2 h-4 w-4" />,
            system: <SunMoon className="mr-2 h-4 w-4" />,
          }[theme]
        }
        <span>{t("Search.Setting.Appreance.Trigger")}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as Theme)}
          >
            <DropdownMenuRadioItem value={"light" as Theme}>
              <Sun className="mr-2 h-4 w-4" />
              {t("Search.Setting.Appreance.Light")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"dark" as Theme}>
              <Moon className="mr-2 h-4 w-4" />
              {t("Search.Setting.Appreance.Dark")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"system" as Theme}>
              <SunMoon className="mr-2 h-4 w-4" />
              {t("Search.Setting.Appreance.System")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
