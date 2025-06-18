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
import { currentUserBidsQueryOptions } from "~/queries/current-user-bids-query";

export const Route = createFileRoute("/(authorized)/my/bids")({
	validateSearch: z.object({
		page: z.number().default(0),
	}),
	loaderDeps: ({ search: { page } }) => ({
		page,
	}),
	loader: ({ context: { queryClient }, deps: { page } }) => {
		queryClient.prefetchQuery(currentUserBidsQueryOptions(page));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { page } = Route.useSearch();
	const { data: bids } = useSuspenseQuery(currentUserBidsQueryOptions(page));

	return (
		<>
			<h1 className="font-semibold text-2xl">입찰 내역</h1>
			<Card>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>입찰 상품</TableHead>
								<TableHead>입찰 금액</TableHead>
								<TableHead>입찰 일시</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{bids ? (
								bids.content.map((bid) => (
									<TableRow key={bid.id}>
										<TableCell>
											<Link
												params={{ id: bid.product.id.toString() }}
												to="/products/$id"
											>
												{bid.product.name}
											</Link>
										</TableCell>
										<TableCell>{bid.price.toLocaleString()}원</TableCell>
										<TableCell>
											{new Date(bid.createdDate).toLocaleString()}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell className="text-center" colSpan={3}>
										입찰 내역이 없습니다.
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
