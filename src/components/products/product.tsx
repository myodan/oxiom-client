import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ProductSummary } from "~/schemas/product";
import { Badge } from "../ui/badge";

export type ProductsProps = {
	product: ProductSummary;
};

export function Porduct({ product }: ProductsProps) {
	return (
		<Link params={{ id: product.id.toString() }} to="/products/$id">
			<li className="flex flex-col overflow-hidden rounded-md border">
				<div className="relative flex overflow-hidden">
					<img
						alt="상품 미리보기"
						className="aspect-square grow object-cover"
						src={
							product.thumbnail.startsWith("http")
								? product.thumbnail
								: `${import.meta.env.PUBLIC_S3_URL}/${product.thumbnail}`
						}
					/>
					<div className="absolute right-0 bottom-0 left-0 flex justify-between p-2">
						{product.status === "OPEN" ? (
							<Badge variant="secondary">경매 진행 중</Badge>
						) : (
							<Badge variant="destructive">경매 종료 됨</Badge>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-2 border-t px-3 py-2">
					<h1 className="line-clamp-1 font-bold text-lg">{product.name}</h1>
					<div className="hidden basis-[2.5rem] flex-col md:flex">
						<p className="line-clamp-2 text-muted-foreground text-sm">
							{product.description}
						</p>
					</div>
					<div className="flex items-end justify-between">
						<div className="flex flex-col">
							<p className="line-clamp-1 text-muted-foreground text-xs">
								현재 입찰가
							</p>
							<p className="line-clamp-1 font-bold text-lg">
								{product.currentPrice.toLocaleString()}원
							</p>
						</div>
						<Button size="icon" variant="ghost">
							<ArrowRightIcon />
						</Button>
					</div>
				</div>
			</li>
		</Link>
	);
}
