import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
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
								<TableHead>생성 일시</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{bids ? (
								bids.content.map((bid) => (
									<TableRow key={bid.id}>
										<TableCell>
											<Link
												to="/products/$id"
												params={{ id: bid.product.id.toString() }}
											>
												{bid.product.name}
											</Link>
										</TableCell>
										<TableCell className="text-right">
											{bid.price.toLocaleString()}원
										</TableCell>
										<TableCell>
											{new Date(bid.createdDate).toLocaleString()}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={3} className="text-center">
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
