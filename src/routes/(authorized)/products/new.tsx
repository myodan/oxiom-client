import { createFileRoute } from "@tanstack/react-router";
import { CategoryCombobox } from "~/components/products/forms/category-combobox";

export const Route = createFileRoute("/(authorized)/products/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<CategoryCombobox />
		</div>
	);
}
