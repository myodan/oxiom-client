import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { RouterBackButton } from "~/components/common/router-back-button";
import { ProductShareButton } from "~/components/products/product-share-button";
import { BidHistorySection } from "~/components/products/sections/bid-history-section";
import { DeliverySection } from "~/components/products/sections/delivery-section";
import { DescriptionSection } from "~/components/products/sections/description-section";
import { InfoSection } from "~/components/products/sections/info-section";
import { RefundPolicySecion } from "~/components/products/sections/refund-policy-section";
import { SellerSection } from "~/components/products/sections/seller-section";
import { productBidsQueryOptions } from "~/queries/product-bids-query";
import { productQueryOptions } from "~/queries/product-query";
import { BidSchema } from "~/schemas/bid";
import { useStompClientStore } from "~/stores/stomp-client-store";

export const Route = createFileRoute("/(default)/products/$id")({
	loader: ({ context: { queryClient }, params: { id } }) => {
		queryClient.ensureQueryData(productQueryOptions(+id));
		queryClient.ensureQueryData(productBidsQueryOptions(+id));
	},
	pendingComponent: () => null,
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: product } = useSuspenseQuery(productQueryOptions(+id));
	const { data: productBids } = useSuspenseQuery(productBidsQueryOptions(+id));

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
			<div className="flex items-center justify-between gap-2">
				<RouterBackButton />
				<ProductShareButton productId={+id} />
			</div>
			<InfoSection product={product} />
			<DescriptionSection description={product.description} />
			<SellerSection seller={product.createdBy} />
			<BidHistorySection bids={productBids?.content} />
			<DeliverySection />
			<RefundPolicySecion />
		</div>
	);
}
