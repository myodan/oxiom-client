import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod/v4";
import { Card, CardContent } from "~/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { currentUserProductsQueryOptions } from "~/queries/current-user-products-query";

export const Route = createFileRoute("/(authorized)/my/products")({
	validateSearch: z.object({
		page: z.number().default(0),
	}),
	loaderDeps: ({ search: { page } }) => ({
		page,
	}),
	loader: ({ context: { queryClient }, deps: { page } }) => {
		queryClient.ensureQueryData(currentUserProductsQueryOptions(page));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { page } = Route.useSearch();
	const { data: products } = useSuspenseQuery(
		currentUserProductsQueryOptions(page),
	);

	return (
		<>
			<h1 className="font-semibold text-2xl">상품 관리</h1>
			<Card>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>상태</TableHead>
								<TableHead>상품</TableHead>
								<TableHead>시작 입찰가</TableHead>
								<TableHead>현재 입찰가</TableHead>
								<TableHead>상위 입찰자</TableHead>
								<TableHead>종료 일시</TableHead>
								<TableHead>생성 일시</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products ? (
								products.content.map((product) => (
									<TableRow key={product.id}>
										<TableCell>{product.status}</TableCell>
										<TableCell>
											<Link
												params={{ id: product.id.toString() }}
												to="/products/$id"
											>
												{product.name}
											</Link>
										</TableCell>
										<TableCell className="text-right">
											{product.initialPrice.toLocaleString()}원
										</TableCell>
										<TableCell className="text-right">
											{product.currentPrice.toLocaleString()}원
										</TableCell>
										<TableCell>
											{product.highestBidder
												? product.highestBidder?.displayName ||
													product.highestBidder?.username
												: "없음"}
										</TableCell>
										<TableCell>
											{new Date(product.endDate).toLocaleString()}
										</TableCell>
										<TableCell>
											{new Date(product.createdDate).toLocaleString()}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell className="text-center" colSpan={3}>
										등록된 상품이 없습니다.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}
