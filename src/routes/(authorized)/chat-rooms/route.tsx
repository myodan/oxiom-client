import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { chatRoomsQueryOptions } from "~/queries/chat-rooms";

export const Route = createFileRoute("/(authorized)/chat-rooms")({
	loader: ({ context: { queryClient, currentUser } }) => {
		queryClient.ensureQueryData(chatRoomsQueryOptions(currentUser.id));
	},
	pendingComponent: () => null,
	component: RouteComponent,
});

function RouteComponent() {
	const { currentUser } = Route.useRouteContext();
	const { data: chatRooms } = useSuspenseQuery(
		chatRoomsQueryOptions(currentUser.id),
	);

	if (!chatRooms || chatRooms.content.length === 0) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-gray-500">채팅방이 없습니다.</p>
			</div>
		);
	}

	return (
		<div className="flex h-0 grow gap-4">
			<aside className="flex basis-1/4 flex-col gap-6">
				<ScrollArea className="flex flex-1 flex-col gap-2 overflow-y-scroll rounded-md border p-2">
					{chatRooms.content.map((chatRoom) => {
						const user =
							chatRoom.user1.id === currentUser.id
								? chatRoom.user2
								: chatRoom.user1;

						return (
							<Link
								key={chatRoom.id}
								to="/chat-rooms/$id"
								params={{ id: chatRoom.id.toString() }}
								className="flex cursor-pointer gap-2 rounded-md hover:bg-accent [&.active]:bg-accent"
							>
								<div className="flex items-center gap-2 p-2">
									<Avatar>
										<AvatarImage src={user.avatarUrl || ""} />
										<AvatarFallback>
											<UserIcon className="size-4 fill-secondary-foreground" />
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<p>{user.displayName}</p>
										{chatRoom.lastChatMessage && (
											<p className="text-muted-foreground text-sm">
												{chatRoom.lastChatMessage.content}
											</p>
										)}
									</div>
								</div>
							</Link>
						);
					})}
				</ScrollArea>
			</aside>
			<main className="flex basis-3/4 flex-col gap-4">
				<Outlet />
			</main>
		</div>
	);
}
