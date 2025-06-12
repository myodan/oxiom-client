import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { PlusIcon, XIcon } from "lucide-react";
import { z } from "zod/v4";
import { ProductSearch } from "~/components/products/product-search";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CATEGORIES } from "~/constants/categories";
import { productsInfiniteQueryOptions } from "~/queries/products";

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
		<div className="grid grid-cols-4 gap-4">
			<aside className="col-span-1 flex flex-col gap-4">
				<ProductSearch />
			</aside>
			<main className="col-span-3 flex flex-col gap-4">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between gap-4">
						<h1 className="font-bold font-serif text-2xl">상품 목록</h1>
						<div className="flex items-center gap-2">
							<Link to="/products/new" preload={false}>
								<Button>
									<PlusIcon /> 새 상품 등록
								</Button>
							</Link>
						</div>
					</div>
					{categoryId && (
						<Badge
							onClick={() =>
								navigate({
									to: "/products",
									search: (prev) => ({
										...prev,
										categoryId: undefined,
									}),
								})
							}
							className="cursor-pointer"
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
