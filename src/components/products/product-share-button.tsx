import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { ShareIcon } from "lucide-react";
import { type FC, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { productQueryOptions } from "~/queries/product-query";

export type ProductShareButtonProps = {
	productId: number;
};

export const ProductShareButton: FC<ProductShareButtonProps> = ({
	productId,
}) => {
	const location = useLocation();
	const { data: product } = useSuspenseQuery(productQueryOptions(productId));

	const handleClick = useCallback(() => {
		if (!product) {
			throw new Error("상품이 존재하지 않습니다.");
		}

		navigator.share({
			title: product.name,
			url: location.href,
			text: product.description,
		});
	}, [product, location]);

	return (
		<Button
			className="rounded-full"
			onClick={handleClick}
			size="icon"
			variant="outline"
		>
			<ShareIcon />
		</Button>
	);
};
