import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { Logo } from "~/components/common/logo";

export const Route = createFileRoute("/(unauthorized)")({
	beforeLoad: async ({ context: { currentUser } }) => {
		if (currentUser) {
			toast.error("잘못된 접근입니다.");
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
