import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./App.css";

import { routeTree } from "./routeTree.gen";

import { ThemeProvider } from "./components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Router {
    router: typeof router;
  }
}

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("General.AppName");
  }, [t]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
