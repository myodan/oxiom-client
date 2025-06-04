import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { z } from "zod/v4";
import { BlurFade } from "~/components/magicui/blur-fade";
import { Porduct } from "~/components/products/product";
import { ProductSearch } from "~/components/products/product-search";
import { Badge } from "~/components/ui/badge";
import { CATEGORYS } from "~/constants/categorys";
import { productsInfiniteQueryOptions } from "~/queries/products-infinite-query";

export const Route = createFileRoute("/(default)/products/")({
	component: RouteComponent,
	validateSearch: z.object({
		keyword: z.string().optional(),
		categoryId: z.coerce.number().optional(),
	}),
	loaderDeps: ({ search: { categoryId, keyword } }) => ({
		categoryId,
		keyword,
	}),
	loader: ({ context: { queryClient }, deps: { categoryId, keyword } }) => {
		queryClient.ensureInfiniteQueryData(
			productsInfiniteQueryOptions(categoryId, keyword),
		);
	},
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { categoryId, keyword } = Route.useSearch();
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
		productsInfiniteQueryOptions(categoryId, keyword),
	);

	const { ref, inView } = useInView();

	useEffect(() => {
		inView && hasNextPage && fetchNextPage();
	}, [inView, hasNextPage, fetchNextPage]);

	return (
		<div className="flex items-start gap-4">
			<aside className="flex basis-1/5 flex-col gap-6">
				<ProductSearch />
			</aside>
			<main className="flex basis-4/5 flex-col gap-4">
				{categoryId && (
					<div className="flex flex-col gap-4">
						<Badge
							onClick={() =>
								navigate({
									to: "/products",
									search: (search) => ({
										...search,
										categoryId: undefined,
									}),
								})
							}
							className="cursor-pointer"
						>
							{CATEGORYS[categoryId - 1].name}
							<XIcon />
						</Badge>
					</div>
				)}
				<ul className="grid grid-cols-4 gap-4">
					{data?.pages.map((page) =>
						page.content.map((product, index) => (
							<BlurFade
								key={product.id}
								delay={0.25 + (index % 4) * 0.05}
								inView
								inViewMargin="0px"
							>
								<Porduct product={product} />
							</BlurFade>
						)),
					)}
				</ul>
				{hasNextPage && (
					<div ref={ref} className="flex justify-center p-4">
						<Loader2Icon className="animate-spin" />
					</div>
				)}
			</main>
		</div>
	);
}
