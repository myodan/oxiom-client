import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authorized)/chat-rooms/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>채팅방을 선택해주세요.</div>;
}
