import type { FC } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import type { ProductBid } from "~/schemas/bid";

export type BidHistorySectionProps = {
	bids?: ProductBid[];
};

export const BidHistorySection: FC<BidHistorySectionProps> = ({ bids }) => {
	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4">
			<h3 className="flex items-center gap-2 font-semibold text-lg">
				최근 입찰 기록
				<p className="text-muted-foreground text-xs">최근 10건</p>
			</h3>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>입찰자</TableHead>
						<TableHead>입찰 금액</TableHead>
						<TableHead>입찰 일시</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bids && bids.length !== 0 ? (
						bids.map((bid) => (
							<TableRow key={bid.id}>
								<TableCell>
									{bid.createdBy.displayName || bid.createdBy.username}
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
		</div>
	);
};
