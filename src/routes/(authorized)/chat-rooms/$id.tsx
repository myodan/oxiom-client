import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authorized)/chat-rooms/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(authorized)/chat-rooms/$id"!</div>;
}
