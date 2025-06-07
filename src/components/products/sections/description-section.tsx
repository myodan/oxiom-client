import type { Product } from "~/schemas/product";

export type DescriptionSectionProps = {} & Pick<Product, "description">;

export function DescriptionSection({ description }: DescriptionSectionProps) {
	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4">
			<h3 className="font-semibold font-serif text-lg">상품 설명</h3>
			<p className="whitespace-pre-wrap">{description}</p>
		</div>
	);
}
