import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import { currentUserQueryOptions } from "~/queries/current-user-query";
import { useTokenStore } from "~/stores/token-store";

export const useSignOutMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const setAccessToken = useTokenStore((state) => state.setAccessToken);

	return useMutation({
		mutationKey: ["sign-out"],
		mutationFn: () => {
			return fetcher.post("auth/token/invalidate", {
				credentials: "include",
			});
		},
		onSuccess: async () => {
			toast.success("성공적으로 로그아웃되었습니다.");
			setAccessToken(null);
			await queryClient.refetchQueries({
				queryKey: currentUserQueryOptions().queryKey,
			});
			navigate({ to: "/", replace: true });
		},
		onError: (error) => {
			console.error(error);
			toast.error("로그아웃 중 오류가 발생했습니다.");
		},
	});
};
