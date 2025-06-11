import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-oxc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tanstackRouter({
			autoCodeSplitting: true,
			generatedRouteTree: "./src/route-tree.gen.ts",
			semicolons: true,
			quoteStyle: "double",
		}),
		react(),
		tailwindcss(),
		tsconfigPaths(),
	],
	envPrefix: ["PUBLIC_"],
});
