import { createFileRoute, redirect } from "@tanstack/react-router";
import { currentUserQueryOptions } from "~/queries/current-user-query";

export const Route = createFileRoute("/(authorized)")({
	beforeLoad: async ({ context: { queryClient }, location }) => {
		const currentUser = await queryClient.ensureQueryData(
			currentUserQueryOptions(),
		);
		if (!currentUser) {
			throw redirect({ to: "/sign-in", search: { redirect: location.href } });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(authorized)"!</div>;
}
