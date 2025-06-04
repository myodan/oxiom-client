import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetcher } from "~/lib/fetcher";
import { type User, UserSchema } from "~/schemas/user";

export function currentUserQueryOptions() {
	return queryOptions({
		queryKey: ["auth", "current-user"],
		retry: 0,
		staleTime: 360000,
		queryFn: async () => {
			return fetcher
				.get<User | null>("users/me")
				.then(async (response) => {
					const data = await response.json();
					return UserSchema.nullable().parse(data);
				})
				.catch(() => {
					return null;
				});
		},
	});
}

export function useCurrentUser() {
	return useSuspenseQuery(currentUserQueryOptions());
}
