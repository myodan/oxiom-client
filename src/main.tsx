import "@fontsource-variable/noto-sans-kr/index.css";
import "@fontsource-variable/noto-serif-kr/index.css";
import "nprogress/nprogress.css";
import "~/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeSync } from "~/components/common/theme-sync";
import { Toaster } from "~/components/ui/sonner";
import { nProgress } from "~/lib/nprogress";
import { routeTree } from "~/route-tree.gen";

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

router.subscribe("onBeforeLoad", ({ fromLocation, hrefChanged }) => {
	fromLocation && hrefChanged && nProgress.start();
});

router.subscribe("onLoad", () => {
	nProgress.done();
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeSync />
			<Toaster />
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>,
	);
}
