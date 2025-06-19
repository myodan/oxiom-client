import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { z } from "zod/v4";
import { useShallow } from "zustand/react/shallow";
import { useStompClientSync } from "~/hooks/use-stomp-client-sync";
import { currentUserNotificationsQueryOptions } from "~/queries/current-user-notifications-query";
import { currentUserQueryOptions } from "~/queries/current-user-query";
import { NotificationSchema } from "~/schemas/notification";
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
	const queryClient = useQueryClient();
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
			`/sub/notify/${currentUser.username}`,
			(message: unknown) => {
				const parsedMessage = NotificationSchema.parse(message);
				queryClient.setQueryData(
					currentUserNotificationsQueryOptions().queryKey,
					(prev) => {
						if (!prev) {
							return {
								content: [parsedMessage],
								page: {
									size: 1,
									number: 0,
									totalElements: 1,
									totalPages: 1,
								},
							};
						}

						return {
							...prev,
							content: [parsedMessage, ...prev.content],
						};
					},
				);
			},
		);

		return () => {
			userNotify.unsubscribe();
		};
	}, [isConnected, stompClient, currentUser, queryClient]);

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
