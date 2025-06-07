import { Badge } from "~/components/ui/badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "~/components/ui/carousel";
import type { Product } from "~/schemas/product";

export type InfoSectionProps = {
	product: Product;
};

export function InfoSection({ product }: InfoSectionProps) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Carousel>
				<CarouselContent>
					{product.images.map((image) => (
						<CarouselItem key={image.id} className="flex">
							<img
								src={image.url}
								alt="Product Preview"
								className="aspect-square grow rounded-lg object-cover"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col">
					<Badge>{product.category.name}</Badge>
					<h1 className="line-clamp-1 font-bold font-serif text-2xl">
						{product.name}
					</h1>
				</div>
				<div className="flex flex-col">
					<p className="text-gray-400 text-sm">현재 입찰가</p>
					<p className="font-bold text-3xl text-primary">
						{product.currentPrice.toLocaleString()}원
					</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground">
					<p className="text-muted-foreground text-sm">
						경매 종료까지 남은 시간
					</p>
					<p className="font-medium text-lg">{product.endDate.toString()}</p>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col">
						<p className="text-muted-foreground text-sm">판매자</p>
						<p className="font-medium">
							{product.createdBy?.displayName || product.createdBy?.username}
						</p>
					</div>
					<div className="flex flex-col">
						<p className="text-muted-foreground text-sm">판매자 평점</p>
						<p className="font-medium">5.0</p>
					</div>
					<div className="flex flex-col">
						<p className="text-muted-foreground text-sm">입찰 시작가</p>
						<p className="font-medium">
							{product.initialPrice.toLocaleString()}원
						</p>
					</div>
					<div className="flex flex-col">
						<p className="text-muted-foreground text-sm">입찰 단위</p>
						<p className="font-medium">{product.bidUnit.toLocaleString()}원</p>
					</div>
				</div>
			</div>
		</div>
	);
}
