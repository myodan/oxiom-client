import { queryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { fetcher } from "~/lib/fetcher";
import { type User, UserSchema } from "~/schemas/user";

export function currentUserQueryOptions() {
	return queryOptions({
		queryKey: ["current-user"],
		retry: 0,
		staleTime: 360000,
		queryFn: () =>
			fetcher
				.get<User | null>("users/me")
				.then(async (response) => {
					const data = await response.json();
					return UserSchema.nullable().parse(data);
				})
				.catch((error) => {
					if (error instanceof HTTPError) {
						return null;
					}
					throw error;
				}),
	});
}
