import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { fetcher } from "~/lib/fetcher";
import { currentUserQueryOptions } from "~/queries/current-user-query";
import type { SignInForm } from "~/schemas/forms/sign-in";
import type { Token } from "~/schemas/token";
import { useTokenStore } from "~/stores/token-store";

export function useSignIn() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { setAccessToken } = useTokenStore();

	return useMutation({
		mutationKey: ["sign-in"],
		mutationFn: async (data: SignInForm) => {
			const response = await fetcher.post<Token>("auth/token", {
				json: data,
				credentials: "include",
			});
			const { accessToken } = await response.json();
			setAccessToken(accessToken);
			queryClient.invalidateQueries({queryKey: currentUserQueryOptions().queryKey});
			navigate({ to: "/" });
		},
	});
}
