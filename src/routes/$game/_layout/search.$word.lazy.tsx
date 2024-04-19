import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Copy, Loader2 } from "lucide-react";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { showLanguagesAtom } from "@/lib/atom";
import { SHOW_LANGUAGE_DESCRIPTION_MAP, ShowLanguage } from "@/lib/types";

export const Route = createLazyFileRoute("/$game/_layout/search/$word")({
  pendingComponent: Pending,
  component: Component,
});

const queryAtomFamily = atomFamily((query: string) => atom(query));

function Pending() {
  return (
    <Layout>
      <Loader2 className="animate-spin" />
    </Layout>
  );
}

function Component() {
  const result = Route.useLoaderData();
  const showLanguages = useAtomValue(showLanguagesAtom);

  return (
    <Layout>
      <PaginationComponent />
      <Accordion type="multiple" className="w-full">
        {result.results.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No results found.
          </div>
        ) : (
          result.results.map((result) => (
            <AccordionItem
              key={result.vocabulary_id}
              value={result.vocabulary_id.toString()}
            >
              <AccordionTrigger>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">
                    {SHOW_LANGUAGE_DESCRIPTION_MAP[result.target_lang]}
                  </span>
                  <span
                    className="text-left"
                    dangerouslySetInnerHTML={{
                      __html: preprocessResultString(result.target),
                    }}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div>
                    <ul className="list-none list-inside space-y-2">
                      {Object.entries(result.lan_dict)
                        .filter(([key]) =>
                          showLanguages.includes(key as ShowLanguage)
                        )
                        .sort()
                        .map(([key, value]) => (
                          <li key={key} className="flex flex-col space-y-1">
                            <div className="flex flex-row items-center space-x-2">
                              <span className="text-xs text-muted-foreground text-nowrap">
                                {
                                  SHOW_LANGUAGE_DESCRIPTION_MAP[
                                    key as ShowLanguage
                                  ]
                                }
                              </span>
                              <CopyButton toCopy={value} />
                            </div>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: preprocessResultString(value),
                              }}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div></div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 max-w-screen-sm mx-auto px-6 pt-5">
      <QueryInput />
      {children}
    </div>
  );
}

function QueryInput() {
  const navigate = useNavigate();
  const { game, word } = Route.useParams();
  const [query, setQuery] = useAtom(queryAtomFamily(word));

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        navigate({
          to: "/$game/search/$word",
          params: {
            game: game,
            word: query,
          },
        });
      }}
    >
      <Input
        className="basis"
        value={query}
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value);
        }}
      />
    </form>
  );
}

function CopyButton({ toCopy }: { toCopy: string }) {
  // after copy, switch to checkmark when hover

  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(true);
    });
  };

  const size = 11;
  const strokeWidth = 2.5;

  return (
    <button
      onClick={copy}
      onMouseLeave={() => {
        if (copied) {
          setTimeout(() => {
            setCopied(false);
          }, 500);
        }
      }}
      className="shrink-0"
    >
      {copied ? (
        <Check
          size={size}
          className="stroke-muted-foreground"
          strokeWidth={strokeWidth}
        />
      ) : (
        <Copy
          size={size}
          className="stroke-muted-foreground"
          strokeWidth={strokeWidth}
        />
      )}
    </button>
  );
}

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationComponent() {
  const { total_page: totalPage } = Route.useLoaderData();

  const { page: currentPage } = Route.useLoaderDeps();
  const params = Route.useParams();

  if (totalPage === 0) {
    return null;
  }

  const DISPLAY_PAGE_COUNT = 3;

  let displayingPages: number[];
  if (totalPage === 1) {
    displayingPages = [];
  } else if (currentPage === 1) {
    displayingPages = [2, 3];
  } else if (currentPage === 2) {
    displayingPages = [2, 3, 4];
  } else if (currentPage === totalPage) {
    displayingPages = [totalPage - 2, totalPage - 1];
  } else if (currentPage === totalPage - 1) {
    displayingPages = [totalPage - 3, totalPage - 2, totalPage - 1];
  } else {
    displayingPages = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <Pagination className="w-full">
      <PaginationContent>
        <PaginationItem className="hidden sm:block">
          <Link
            to="/$game/search/$word"
            params={params}
            search={{
              page: Math.max(currentPage - 1, 1),
            }}
          >
            <PaginationPrevious />
          </Link>
        </PaginationItem>
        <div className="flex flex-row sm:justify-center justify-start w-full">
          <PaginationItem
            className={
              currentPage === 1 || currentPage === 2 ? "" : "hidden md:block"
            }
          >
            <Link to="/$game/search/$word" params={params} search={{ page: 1 }}>
              <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
            </Link>
          </PaginationItem>
          {currentPage >= 4 ? (
            <PaginationItem
              className={currentPage === 1 ? "" : "hidden sm:block"}
            >
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}
          {displayingPages.map((page) => (
            <PaginationItem key={page}>
              <Link to="/$game/search/$word" params={params} search={{ page }}>
                <PaginationLink isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </Link>
            </PaginationItem>
          ))}
          {currentPage < totalPage - DISPLAY_PAGE_COUNT ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}
          <PaginationItem
            className={"hidden" + (totalPage != 1 ? "sm:block" : "")}
          >
            <Link
              to="/$game/search/$word"
              params={params}
              search={{ totalPage }}
            >
              <PaginationLink isActive={currentPage === totalPage}>
                {totalPage}
              </PaginationLink>
            </Link>
          </PaginationItem>
        </div>
        <PaginationItem>
          <Link
            to="/$game/search/$word"
            params={params}
            search={{
              page: Math.min(currentPage + 1, totalPage),
            }}
          >
            <PaginationNext />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function preprocessResultString(result: string): string {
  const regex = /\{RUBY_B#(.*?)\}(.*?)\{RUBY_E#\}/g;
  return result.replace(regex, "<ruby>$2<rt>$1</rt></ruby>");
}
