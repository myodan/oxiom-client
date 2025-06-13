import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import { currentUserQueryOptions } from "~/queries/current-user-query";
import { Route } from "~/routes/(unauthorized)/sign-in";
import type { SignInForm } from "~/schemas/forms/sign-in";
import type { Token } from "~/schemas/token";
import { useTokenStore } from "~/stores/token-store";

export function useSignInMutation() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const setAccessToken = useTokenStore((state) => state.setAccessToken);

	return useMutation({
		mutationKey: ["sign-in"],
		mutationFn: (data: SignInForm) => {
			return fetcher.post<Token>("auth/token", {
				json: data,
				credentials: "include",
			});
		},
		onSuccess: async (response) => {
			const { accessToken } = await response.json();
			setAccessToken(accessToken);
			await queryClient.refetchQueries({
				queryKey: currentUserQueryOptions().queryKey,
			});
			toast.success("성공적으로 로그인되었습니다.");
			navigate({ to: search.redirect || "/" });
		},
		onError: (error) => {
			console.error(error);
			toast.error("로그인 중 오류가 발생했습니다.");
		},
	});
}
