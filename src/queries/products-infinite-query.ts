import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetcher } from "~/lib/fetcher";
import { PageSchema } from "~/schemas/page";
import { ProductSummarySchema } from "~/schemas/product";

export function productsInfiniteQueryOptions(
	categoryId?: number,
	keyword?: string,
) {
	return infiniteQueryOptions({
		queryKey: ["products", { categoryId, keyword }],
		queryFn: async ({ pageParam }) => {
			const response = await fetcher("products", {
				searchParams: {
					page: pageParam,
					sort: "id,desc",
					...(categoryId && { categoryId }),
					...(keyword && { keyword }),
				},
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			return PageSchema(ProductSummarySchema).parse(data);
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			const nextPage = lastPage.page.number + 1;
			return nextPage < lastPage.page.totalPages ? nextPage : undefined;
		},
		staleTime: 1000 * 60 * 10,
	});
}
