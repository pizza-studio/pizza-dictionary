import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col pt-32 justify-center items-center space-y-6">
      <h1 className="mx-auto scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t("General.AppName")}
      </h1>
      <p className="">
        <span className="scroll-m-20 font-normal text-muted-foreground">
          by{" "}
        </span>
        <a
          href="https://github.com/pizza-studio"
          className="scroll-m-20 text-xl font-normal text-muted-foreground hover:underline"
        >
          {t("General.PizzaStudio")}
        </a>
      </p>
      <div className="flex flex-col space-y-3">
        <Button asChild>
          <Link to="/$game" params={{ game: "gi" }}>
            {t("General.Genshin")}
          </Link>
        </Button>
        <Button asChild>
          <Link to="/$game" params={{ game: "hsr" }}>
            {t("General.HSR")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
