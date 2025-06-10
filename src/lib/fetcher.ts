import ky, {
	HTTPError,
	type BeforeRequestHook,
	type BeforeRetryHook,
} from "ky";
import { useTokenStore } from "~/stores/token-store";

type TokenResponse = {
	accessToken: string;
	refreshToken: string;
};

const baseFetcher = ky.create({
	prefixUrl: import.meta.env.PUBLIC_API_URL,
});

const attachAccessToken: BeforeRequestHook = (request) => {
	const { accessToken } = useTokenStore.getState();

	if (accessToken !== null) {
		request.headers.set("Authorization", `Bearer ${accessToken}`);
	}
};

const attemptTokenRefresh: BeforeRetryHook = async ({ error }) => {
	if (!(error instanceof HTTPError)) {
		return ky.stop;
	}

	const { setAccessToken } = useTokenStore.getState();

	const response = await baseFetcher.post<TokenResponse>("auth/token/refresh", {
		credentials: "include",
	});

	if (!response.ok) {
		setAccessToken(null);
		return ky.stop;
	}

	const { accessToken } = await response.json();

	setAccessToken(accessToken);
};

export const fetcher = baseFetcher.extend({
	retry: {
		limit: 3,
		statusCodes: [401, 403],
	},
	hooks: {
		beforeRequest: [attachAccessToken],
		beforeRetry: [attemptTokenRefresh],
	},
});
