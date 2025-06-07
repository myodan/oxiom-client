import { fetcher } from "~/lib/fetcher";
import { ProductSchema } from "~/schemas/product";

export function productQueryOptions(id: number) {
	return {
		queryKey: ["products", id],
		queryFn: async () => {
			const response = await fetcher(`products/${id}`);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			return ProductSchema.parse(data);
		},
		staleTime: 1000 * 60 * 10,
	};
}
