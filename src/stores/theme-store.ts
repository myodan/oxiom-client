import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
	theme: "light" | "dark" | "system";
};

type ThemeAction = {
	setTheme: (theme: ThemeState["theme"]) => void;
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
	persist(
		(set) => {
			return {
				theme: "system",
				setTheme: (theme) => set({ theme }),
			};
		},
		{
			name: "theme-store",
		},
	),
);
