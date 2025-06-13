import { infiniteQueryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { type Page, PageSchema } from "~/schemas/page";
import { type ProductSummary, ProductSummarySchema } from "~/schemas/product";

export function productsInfiniteQueryOptions(
	categoryId?: number,
	keyword?: string,
) {
	return infiniteQueryOptions({
		queryKey: ["products", { categoryId, keyword }],
		queryFn: async ({ pageParam }) =>
			fetcher
				.get<Page<ProductSummary>>("products", {
					searchParams: {
						size: 36,
						page: pageParam,
						sort: "id,desc",
						...(categoryId && { categoryId }),
						...(keyword && { keyword }),
					},
				})
				.then(async (response) => {
					const data = await response.json();
					return PageSchema(ProductSummarySchema).parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (!lastPage || !lastPage.page) {
				return undefined;
			}
			const nextPage = lastPage.page.number + 1;
			return nextPage < lastPage.page.totalPages ? nextPage : undefined;
		},
		staleTime: 1000 * 60 * 10,
	});
}
