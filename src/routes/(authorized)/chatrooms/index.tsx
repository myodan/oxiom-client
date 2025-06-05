import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authorized)/chatrooms/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(authorized)/chatrooms/"!</div>;
}
