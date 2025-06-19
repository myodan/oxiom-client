import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { NotificationSchema } from "~/schemas/notification";
import { PageSchema } from "~/schemas/page";

export const currentUserNotificationsQueryOptions = (page: number = 0) => {
	return queryOptions({
		queryKey: ["current-user", "notifications", { page }],
		queryFn: async () =>
			fetcher
				.get("users/me/notifications", {
					searchParams: [["page", page.toString()]],
				})
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(NotificationSchema).parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
};
