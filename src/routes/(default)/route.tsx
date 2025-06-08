import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/common/header";

export const Route = createFileRoute("/(default)")({
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
