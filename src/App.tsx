import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./App.css";

import { routeTree } from "./routeTree.gen";

import { ThemeProvider } from "./components/ThemeProvider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Router {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
