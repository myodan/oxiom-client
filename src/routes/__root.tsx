import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { z } from "zod/v4";
import { useShallow } from "zustand/react/shallow";
import { useStompClientSync } from "~/hooks/use-stomp-client-sync";
import { currentUserQueryOptions } from "~/queries/current-user-query";
import { useStompClientStore } from "~/stores/stomp-client-store";

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
	const { currentUser } = Route.useRouteContext();
	useStompClientSync();

	const { isConnected, stompClient } = useStompClientStore(
		useShallow(({ isConnected, stompClient }) => ({
			isConnected,
			stompClient,
		})),
	);

	useEffect(() => {
		if (!isConnected || !currentUser) {
			return;
		}

		const userNotify = stompClient.subscribe(
			"/user/notify",
			(message: unknown) => {
				console.log("User notification received:", message);
			},
		);

		return () => {
			userNotify.unsubscribe();
		};
	}, [isConnected, stompClient, currentUser]);

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
