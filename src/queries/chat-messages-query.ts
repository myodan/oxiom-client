import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { type ChatMessage, ChatMessageSchema } from "~/schemas/chat-message";
import { type Page, PageSchema } from "~/schemas/page";

export function chatMessagesQueryOptions(chatRoomId: number) {
	return queryOptions({
		queryKey: ["chat-rooms", chatRoomId, "chat-messages"],
		queryFn: () =>
			fetcher
				.get<Page<ChatMessage>>(`chat-rooms/${chatRoomId}/chat-messages`, {
					searchParams: {
						sort: "createdDate,DESC",
					},
				})
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(ChatMessageSchema).parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
}
