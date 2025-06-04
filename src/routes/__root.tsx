import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "~/components/ui/sonner";
import { useThemeSync } from "~/hooks/use-theme-effect";
import { currentUserQueryOptions } from "~/queries/current-user-query";

type RootRouteContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(currentUserQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  useThemeSync();

  return (
    <>
      <main className="flex min-h-lvh flex-col">
        <Outlet />
      </main>
      <Toaster />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
