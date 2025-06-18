import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { ProductBidSchema } from "~/schemas/bid";
import { PageSchema } from "~/schemas/page";

export const productBidsQueryOptions = (id: number, page: number = 0) => {
	return queryOptions({
		queryKey: ["products", id, "bids", { page }],
		queryFn: async () =>
			fetcher
				.get(`products/${id}/bids`, {
					searchParams: [
						["page", page.toString()],
						["size", "10"],
						["sort", "createdDate,desc"],
					],
				})
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(ProductBidSchema).parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
};
