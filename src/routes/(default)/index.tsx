import { createFileRoute } from "@tanstack/react-router";
import { PromotionBanner } from "~/components/landing/promotion-banner";

export const Route = createFileRoute("/(default)/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<PromotionBanner />
		</div>
	);
}
