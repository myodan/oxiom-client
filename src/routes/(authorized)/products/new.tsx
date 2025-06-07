import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authorized)/products/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(authorized)/products/new"!</div>;
}
