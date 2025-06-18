import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { MY_MENU } from "~/constants/my-menu";

export const Route = createFileRoute("/(authorized)/my")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex gap-4">
			<aside className="flex shrink-0 basis-1/4 flex-col gap-4">
				<nav className="flex flex-col gap-1">
					{MY_MENU.map((item) => (
						<Link
							className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-accent [&.active]:bg-accent [&.active]:font-medium"
							key={item.to}
							to={item.to}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</aside>
			<main className="flex basis-3/4 flex-col gap-4 overflow-x-auto">
				<Outlet />
			</main>
		</div>
	);
}
