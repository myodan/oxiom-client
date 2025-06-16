import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { type UserBid, UserBidSchema } from "~/schemas/bid";
import { type Page, PageSchema } from "~/schemas/page";

export const currentUserBidsQueryOptions = (page: number) => {
	return queryOptions({
		queryKey: ["current-user", "bids", { page }],
		queryFn: async () =>
			fetcher
				.get<Page<UserBid>>("users/me/bids", {
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
