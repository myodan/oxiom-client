import { queryOptions } from "@tanstack/react-query";
import { fetcher } from "~/lib/fetcher";
import { type ChatRoom, ChatRoomSchema } from "~/schemas/chat-room";
import { type Page, PageSchema } from "~/schemas/page";

export function chatRoomsQueryOptions(userId: number) {
	return queryOptions({
		queryKey: ["chat-rooms", { userId }],
		queryFn: async () => {
			return fetcher
				.get<Page<ChatRoom>>("chat-rooms", { searchParams: { userId } })
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(ChatRoomSchema).parse(data);
				})
				.catch(() => {
					return null;
				});
		},
	});
}
