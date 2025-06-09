import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import { currentUserQueryOptions } from "~/queries/current-user";
import { useTokenStore } from "~/stores/token-store";

export const useSignOutMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { setAccessToken } = useTokenStore();

	return useMutation({
		mutationKey: ["sign-out"],
		mutationFn: async () => {
			const response = await fetcher.post("auth/token/invalidate", {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("로그아웃 실패");
			}

			toast.success("성공적으로 로그아웃되었습니다.");
			setAccessToken(null);
			queryClient.invalidateQueries({
				queryKey: currentUserQueryOptions().queryKey,
			});
			navigate({ to: "/" });
		},
		onError: () => {
			toast.error("로그아웃 중 오류가 발생했습니다.");
		},
	});
};
