import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { SendIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { chatMessagesQueryOptions } from "~/queries/chat-messages";
import { chatRoomQueryOptions } from "~/queries/chat-room";

export const Route = createFileRoute("/(authorized)/chat-rooms/$id")({
	loader: ({ context: { queryClient }, params: { id } }) => {
		queryClient.ensureQueryData(chatRoomQueryOptions(+id));
		queryClient.ensureQueryData(chatMessagesQueryOptions(+id));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { currentUser } = Route.useRouteContext();
	const { data: chatRoom } = useSuspenseQuery(chatRoomQueryOptions(+id));
	const { data: chatMessages } = useSuspenseQuery(
		chatMessagesQueryOptions(+id),
	);

	if (!chatRoom || !chatMessages) {
		throw notFound();
	}

	const targetUser =
		chatRoom.user1.id === currentUser.id ? chatRoom.user2 : chatRoom.user1;

	return (
		<div className="flex min-h-0 grow flex-col rounded-md border">
			<div className="flex items-center justify-center gap-2 border-b p-4">
				<Avatar>
					<AvatarImage src={targetUser.avatarUrl || ""} />
					<AvatarFallback>
						<UserIcon className="size-4 fill-secondary-foreground" />
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<p>{targetUser.displayName}</p>
				</div>
			</div>
			<ScrollArea className="grow overflow-y-scroll">
				<div className="flex flex-col gap-2 p-2">
					{chatMessages.content
						.slice()
						.reverse()
						.map((chatMessage) => {
							const isCurrentUser = currentUser.id === chatMessage.senderId;

							return (
								<div key={chatMessage.id} className={"flex flex-col gap-1"}>
									<div
										className={cn(
											"rounded-md p-2",
											isCurrentUser
												? "self-end bg-primary text-primary-foreground"
												: "self-start bg-secondary text-secondary-foreground",
										)}
									>
										{chatMessage.content}
									</div>
									<span
										className={cn(
											"flex text-muted-foreground text-xs",
											isCurrentUser ? "self-end" : "self-start",
										)}
									>
										{new Date(chatMessage.createdDate).toLocaleTimeString()}
									</span>
								</div>
							);
						})}
				</div>
			</ScrollArea>
			<div className="flex gap-2 border-t p-2">
				<Input placeholder="채팅을 입력하세요" />
				<Button size="icon">
					<SendIcon />
				</Button>
			</div>
		</div>
	);
}
