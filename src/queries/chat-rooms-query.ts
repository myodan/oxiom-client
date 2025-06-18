import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { ChatRoomSchema } from "~/schemas/chat-room";
import { PageSchema } from "~/schemas/page";

export function chatRoomsQueryOptions(userId: number) {
	return queryOptions({
		queryKey: ["chat-rooms", { userId }],
		queryFn: () =>
			fetcher
				.get("chat-rooms", { searchParams: { userId } })
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
