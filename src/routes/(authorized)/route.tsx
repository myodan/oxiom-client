import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Header } from "~/components/common/header";
import { currentUserQueryOptions } from "~/queries/current-user";

export const Route = createFileRoute("/(authorized)")({
	beforeLoad: async ({ context: { queryClient }, location }) => {
		const currentUser = await queryClient.ensureQueryData(
			currentUserQueryOptions(),
		);
		if (!currentUser) {
			throw redirect({ to: "/sign-in", search: { redirect: location.href } });
		}

		return { currentUser };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Header />
			<div className="container mx-auto my-4 flex max-w-7xl grow flex-col gap-4 px-4">
				<Outlet />
			</div>
		</>
	);
}
