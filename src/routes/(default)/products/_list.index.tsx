import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Porduct } from "~/components/products/product";
import { productsInfiniteQueryOptions } from "~/queries/products-query";

export const Route = createFileRoute("/(default)/products/_list/")({
	pendingComponent: () => null,
	component: RouteComponent,
});

function RouteComponent() {
	const { categoryId, keyword } = Route.useSearch();
	const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
		productsInfiniteQueryOptions(categoryId, keyword),
	);

	const { ref, inView } = useInView();

	useEffect(() => {
		inView && hasNextPage && fetchNextPage();
	}, [inView, hasNextPage, fetchNextPage]);

	return (
		<ul className="grid grid-cols-3 gap-4">
			{data.pages.map((page) =>
				page?.content.map((product) => (
					<Porduct key={product.id} product={product} />
				)),
			)}
			{hasNextPage && (
				<div ref={ref} className="col-span-full flex justify-center p-4">
					<Loader2Icon className="animate-spin" />
				</div>
			)}
		</ul>
	);
}
