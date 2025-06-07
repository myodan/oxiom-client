import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Logo } from "~/components/common/logo";
import { currentUserQueryOptions } from "~/queries/current-user-query";

export const Route = createFileRoute("/(unauthorized)")({
	beforeLoad: async ({ context: { queryClient } }) => {
		const currentUser = await queryClient.ensureQueryData(
			currentUserQueryOptions(),
		);
		if (currentUser) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-lvh flex-col items-center justify-center p-4">
			<div className="flex w-full max-w-md flex-col gap-8">
				<div className="flex justify-center">
					<Logo />
				</div>
				<Outlet />
			</div>
		</div>
	);
}
