import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authorized)/chat-rooms/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-0 grow flex-col items-center justify-center rounded-md border p-2">
			채팅방을 선택해주세요.
		</div>
	);
}
