import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PromotionBanner } from "~/components/landing/promotion-banner";
import { Porduct } from "~/components/products/product";
import { productsInfiniteQueryOptions } from "~/queries/products-query";

export const Route = createFileRoute("/(default)/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureInfiniteQueryData(productsInfiniteQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseInfiniteQuery(productsInfiniteQueryOptions());

	return (
		<div className="flex flex-col gap-8">
			<PromotionBanner />
			<div className="flex flex-col gap-4">
				<h1 className="font-bold font-serif text-2xl">최근 등록 상품</h1>
				<ul className="grid grid-cols-4 gap-4">
					{data.pages.map((page) =>
						page?.content.map((product) => (
							<Porduct key={product.id} product={product} />
						)),
					)}
				</ul>
			</div>
		</div>
	);
}
