import { createFileRoute } from "@tanstack/react-router";
import { DeliverySection } from "~/components/products/sections/delivery-section";
import { RefundPolicySecion } from "~/components/products/sections/refund-policy-section";

export const Route = createFileRoute("/(default)/products/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4">
			<DeliverySection />
			<RefundPolicySecion />
		</div>
	);
}
