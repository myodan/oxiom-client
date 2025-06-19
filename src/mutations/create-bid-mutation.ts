import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import { productBidsQueryOptions } from "~/queries/product-bids-query";
import type { BidForm } from "~/schemas/forms/bid";

export const useCreateBidMutation = (productId: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create-bid"],
		mutationFn: (data: BidForm) => {
			return fetcher.post(`products/${productId}/bids`, { json: data });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: productBidsQueryOptions(productId).queryKey,
			});
			toast.success("입찰이 성공적으로 등록되었습니다.");
		},
		onError: (error) => {
			console.error(error);
			toast.error("입찰 등록 중 오류가 발생했습니다.");
		},
	});
};
