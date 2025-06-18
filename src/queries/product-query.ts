import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { ProductSchema } from "~/schemas/product";

export function productQueryOptions(id: number) {
	return queryOptions({
		queryKey: ["products", id],
		queryFn: () =>
			fetcher
				.get(`products/${id}`)
				.then(async (response) => {
					const data = await response.json();
					return ProductSchema.parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
		staleTime: 1000 * 60 * 10,
	});
}
