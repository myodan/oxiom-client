import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { PageSchema } from "~/schemas/page";
import { UserProductSchema } from "~/schemas/product";

export const currentUserProductsQueryOptions = (page: number = 0) => {
	return queryOptions({
		queryKey: ["current-user", "products", { page }],
		queryFn: async () =>
			fetcher
				.get("users/me/products", {
					searchParams: [
						["page", page.toString()],
						["sort", "lastModifiedDate,desc"],
						["sort", "createdDate,desc"],
					],
				})
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(UserProductSchema).parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
};
