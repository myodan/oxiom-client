import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		TanStackRouterVite({
			autoCodeSplitting: true,
			generatedRouteTree: "./src/route-tree.gen.ts",
			semicolons: true,
			quoteStyle: "double",
		}),
		viteReact(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src"),
		},
	},
	envPrefix: ["PUBLIC_"],
});
