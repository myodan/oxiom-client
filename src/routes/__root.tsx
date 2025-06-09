import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { z } from "zod/v4";
import { Toaster } from "~/components/ui/sonner";
import { useThemeSync } from "~/hooks/use-theme-effect";
import { currentUserQueryOptions } from "~/queries/current-user";

type RootRouteContext = {
	queryClient: QueryClient;
};

z.config(z.locales.ko());

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
