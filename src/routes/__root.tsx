import { createRootRoute, Outlet } from "@tanstack/react-router";
import TanStackRouterDevtoolsPanel from "@/components/TanStackRouterDevtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtoolsPanel />
    </>
  ),
});
