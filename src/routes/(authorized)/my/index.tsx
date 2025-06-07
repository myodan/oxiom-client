import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authorized)/my/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(authorized)/my/"!</div>;
}
