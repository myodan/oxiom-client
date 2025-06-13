import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import type { BidForm } from "~/schemas/forms/bid";

export const useCreateBidMutation = (productId: number) => {
	return useMutation({
		mutationKey: ["create-bid"],
		mutationFn: (data: BidForm) => {
			return fetcher.post(`products/${productId}/bids`, { json: data });
		},
		onSuccess: () => {
			toast.success("입찰이 성공적으로 등록되었습니다.");
		},
		onError: (error) => {
			console.error(error);
			toast.error("입찰 등록 중 오류가 발생했습니다.");
		},
	});
};
