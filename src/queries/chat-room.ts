import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { type ChatRoom, ChatRoomSchema } from "~/schemas/chat-room";

export function chatRoomQueryOptions(id: number) {
	return queryOptions({
		queryKey: ["chat-rooms", id],
		queryFn: () =>
			fetcher
				.get<ChatRoom>(`chat-rooms/${id}`)
				.then(async (response) => {
					const data = await response.json();
					return ChatRoomSchema.parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
}
