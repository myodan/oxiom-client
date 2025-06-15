import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { SendIcon, UserIcon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { chatMessagesQueryOptions } from "~/queries/chat-messages-query";
import { chatRoomQueryOptions } from "~/queries/chat-room-query";
import { chatRoomsQueryOptions } from "~/queries/chat-rooms-query";
import type { ChatMessage } from "~/schemas/chat-message";
import { ChatMessageFormSchema } from "~/schemas/forms/chat-message";
import { useStompClientStore } from "~/stores/stomp-client-store";

export const Route = createFileRoute("/(authorized)/chat-rooms/$id")({
	loader: ({ context: { queryClient }, params: { id } }) => {
		queryClient.ensureQueryData(chatRoomQueryOptions(+id));
		queryClient.ensureQueryData(chatMessagesQueryOptions(+id));
	},
	pendingComponent: () => null,
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: chatRoom } = useSuspenseQuery(chatRoomQueryOptions(+id));
	const { data: chatMessages } = useSuspenseQuery(
		chatMessagesQueryOptions(+id),
	);

	if (!chatRoom || !chatMessages) {
		throw notFound();
	}

	const scrollRef = useRef<HTMLDivElement>(null);

	const { currentUser } = Route.useRouteContext();

	const targetUser =
		chatRoom.user1.id === currentUser.id ? chatRoom.user2 : chatRoom.user1;

	const queryClient = useQueryClient();
	const { stompClient, isConnected } = useStompClientStore(
		useShallow(({ stompClient, isConnected }) => ({
			stompClient,
			isConnected,
		})),
	);

	const handleMessage = useCallback(
		(chatMessage: ChatMessage) => {
			queryClient.setQueryData(
				chatMessagesQueryOptions(+id).queryKey,
				(prev) => {
					if (!prev) return prev;
					return {
						...prev,
						content: [chatMessage, ...prev.content],
					};
				},
			);
			queryClient.setQueryData(
				chatRoomsQueryOptions(currentUser.id).queryKey,
				(prev) => {
					if (!prev) return prev;
					return {
						...prev,
						content: prev.content.map((room) =>
							room.id === chatRoom.id
								? { ...room, lastChatMessage: chatMessage }
								: room,
						),
					};
				},
			);
		},
		[id, chatRoom.id, currentUser.id, queryClient],
	);

	useEffect(() => {
		if (!isConnected) {
			return;
		}

		const stompSubscription = stompClient.subscribe(
			`/sub/chat-rooms/${id}`,
			(message) => handleMessage(JSON.parse(message.body)),
		);

		return () => {
			stompSubscription.unsubscribe();
		};
	}, [id, stompClient, isConnected, handleMessage]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ block: "end" });
		}
	}, [chatMessages.content.length]);

	const form = useForm({
		resolver: zodResolver(ChatMessageFormSchema),
		defaultValues: {
			content: "",
		},
	});

	const handleSubmit = form.handleSubmit((data) => {
		stompClient.publish({
			destination: `/pub/chat-rooms/${id}`,
			body: JSON.stringify({
				content: data.content,
			}),
		});

		form.reset();
	});

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
				<div ref={scrollRef} className="flex flex-col gap-2 p-4">
					{chatMessages.content
						.slice()
						.reverse()
						.map((chatMessage) => {
							const isCurrentUser = currentUser.id === chatMessage.senderId;

							return (
								<div key={chatMessage.id} className="flex flex-col gap-1">
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
			<Form {...form}>
				<form className="flex gap-2 border-t p-4" onSubmit={handleSubmit}>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="grow">
								<FormControl>
									<Input placeholder="채팅을 입력하세요" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" size="icon">
						<SendIcon />
					</Button>
				</form>
			</Form>
		</div>
	);
}
