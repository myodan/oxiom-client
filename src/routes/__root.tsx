import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { z } from "zod/v4";
import { useStompClientSync } from "~/hooks/use-stomp-client-sync";
import { currentUserQueryOptions } from "~/queries/current-user-query";

type RootRouteContext = {
	queryClient: QueryClient;
};

z.config(z.locales.ko());

export const Route = createRootRouteWithContext<RootRouteContext>()({
	beforeLoad: async ({ context: { queryClient } }) => {
		const currentUser = await queryClient.ensureQueryData(
			currentUserQueryOptions(),
		);

		return { currentUser };
	},
	component: RouteComponent,
});

function RouteComponent() {
	useStompClientSync();

	return (
		<>
			<main className="flex min-h-lvh flex-col">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	);
}
