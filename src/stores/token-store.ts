import { create } from "zustand";

type TokenState = {
	accessToken: string | null;
};

type TokenAction = {
	setAccessToken: (accessToken: TokenState["accessToken"]) => void;
};

export const useTokenStore = create<TokenState & TokenAction>((set) => {
	return {
		accessToken: null,
		setAccessToken: (accessToken) => set({ accessToken }),
	};
});
