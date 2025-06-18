import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { PlusIcon, XIcon } from "lucide-react";
import { z } from "zod/v4";
import { ProductSearch } from "~/components/products/product-search";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CATEGORIES } from "~/constants/categories";
import { productsInfiniteQueryOptions } from "~/queries/products-query";

export const Route = createFileRoute("/(default)/products/_list")({
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
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { categoryId } = Route.useSearch();

	return (
		<div className="flex gap-4">
			<aside className="flex shrink-0 basis-1/4 flex-col gap-4">
				<ProductSearch />
			</aside>
			<main className="flex basis-3/4 flex-col gap-4">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between gap-4">
						<h1 className="font-bold text-2xl">상품 목록</h1>
						<div className="flex items-center gap-2">
							<Link preload={false} to="/products/new">
								<Button>
									<PlusIcon /> 새 상품 등록
								</Button>
							</Link>
						</div>
					</div>
					{categoryId && (
						<Badge
							className="cursor-pointer"
							onClick={() =>
								navigate({
									to: "/products",
									search: (prev) => ({
										...prev,
										categoryId: undefined,
									}),
								})
							}
						>
							{CATEGORIES[categoryId - 1].name}
							<XIcon />
						</Badge>
					)}
				</div>
				<Outlet />
			</main>
		</div>
	);
}
