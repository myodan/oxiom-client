import { useMutation } from "@tanstack/react-query";
import { fetcher } from "~/lib/fetcher";
import { currentUserQueryOptions } from "~/queries/current-user-query";
import { Route } from "~/routes/(unauthorized)/sign-in";
import type { SignInForm } from "~/schemas/forms/sign-in";
import type { Token } from "~/schemas/token";
import { useTokenStore } from "~/stores/token-store";

export function useSignIn() {
	const navigate = Route.useNavigate();
	const { redirect } = Route.useSearch();
	const { queryClient } = Route.useRouteContext();
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
			queryClient.invalidateQueries({
				queryKey: currentUserQueryOptions().queryKey,
			});
			navigate({ to: redirect || "/" });
		},
	});
}
