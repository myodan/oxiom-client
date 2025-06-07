import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { DeliverySection } from "~/components/products/sections/delivery-section";
import { DescriptionSection } from "~/components/products/sections/description-section";
import { InfoSection } from "~/components/products/sections/info-section";
import { RefundPolicySecion } from "~/components/products/sections/refund-policy-section";
import { productQueryOptions } from "~/queries/product-query";

export const Route = createFileRoute("/(default)/products/$id")({
	pendingComponent: () => null,
	loader: ({ context: { queryClient }, params: { id } }) => {
		queryClient.ensureQueryData(productQueryOptions(+id));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: product } = useSuspenseQuery(productQueryOptions(+id));

	return (
		<div className="flex flex-col gap-4">
			<InfoSection product={product} />
			<DescriptionSection description={product.description} />
			<DeliverySection />
			<RefundPolicySecion />
		</div>
	);
}
