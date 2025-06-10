import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { Header } from "~/components/common/header";

export const Route = createFileRoute("/(authorized)")({
	beforeLoad: async ({ context: { currentUser }, location }) => {
		if (!currentUser) {
			toast.error("로그인이 필요합니다.");
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
