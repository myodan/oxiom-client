import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { DeliverySection } from "~/components/products/sections/delivery-section";
import { DescriptionSection } from "~/components/products/sections/description-section";
import { InfoSection } from "~/components/products/sections/info-section";
import { RefundPolicySecion } from "~/components/products/sections/refund-policy-section";
import { SellerSection } from "~/components/products/sections/seller-section";
import { Button } from "~/components/ui/button";
import { productQueryOptions } from "~/queries/product-query";
import { BidSchema } from "~/schemas/bid";
import { useStompClientStore } from "~/stores/stomp-client-store";

export const Route = createFileRoute("/(default)/products/$id")({
	loader: ({ context: { queryClient }, params: { id } }) => {
		queryClient.prefetchQuery(productQueryOptions(+id));
	},
	pendingComponent: () => null,
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { id } = Route.useParams();
	const { data: product } = useSuspenseQuery(productQueryOptions(+id));

	if (!product) {
		throw notFound();
	}

	const queryClient = useQueryClient();
	const { stompClient, isConnected } = useStompClientStore(
		useShallow(({ stompClient, isConnected }) => ({
			stompClient,
			isConnected,
		})),
	);

	useEffect(() => {
		if (!isConnected) {
			return;
		}

		const stompSubscription = stompClient.subscribe(
			`/sub/products/${id}`,
			(message) => {
				if (!message.body) return;
				const bid = BidSchema.parse(JSON.parse(message.body));
				queryClient.setQueryData(productQueryOptions(+id).queryKey, (prev) => {
					if (!prev) return prev;
					return {
						...prev,
						currentPrice: bid.price,
						highestBidder: bid.createdBy,
					};
				});
			},
		);

		return () => {
			stompSubscription.unsubscribe();
		};
	}, [id, queryClient, stompClient, isConnected]);

	return (
		<div className="flex flex-col gap-4">
			<div>
				<Button variant="outline" onClick={() => router.history.back()}>
					<ArrowLeftIcon />
					돌아가기
				</Button>
			</div>
			<InfoSection product={product} />
			<DescriptionSection description={product.description} />
			<SellerSection seller={product.createdBy} />
			<DeliverySection />
			<RefundPolicySecion />
		</div>
	);
}
