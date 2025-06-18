import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { UserBidSchema } from "~/schemas/bid";
import { PageSchema } from "~/schemas/page";

export const currentUserBidsQueryOptions = (page: number = 0) => {
	return queryOptions({
		queryKey: ["current-user", "bids", { page }],
		queryFn: async () =>
			fetcher
				.get("users/me/bids", {
					searchParams: [["page", page.toString()]],
				})
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(UserBidSchema).parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
};
