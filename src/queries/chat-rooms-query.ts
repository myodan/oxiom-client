import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { type ChatRoom, ChatRoomSchema } from "~/schemas/chat-room";
import { type Page, PageSchema } from "~/schemas/page";

export function chatRoomsQueryOptions(userId: number) {
	return queryOptions({
		queryKey: ["chat-rooms", { userId }],
		queryFn: () =>
			fetcher
				.get<Page<ChatRoom>>("chat-rooms", { searchParams: { userId } })
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(ChatRoomSchema).parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
}
