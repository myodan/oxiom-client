import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { CATEGORIES } from "~/constants/categories";
import { Route } from "~/routes/(default)/products/_list";

export function ProductSearch() {
	const search = Route.useSearch();
	const nvatigate = Route.useNavigate();

	const keywordInputRef = useRef<HTMLInputElement>(null);

	const updateSearchParams = <K extends keyof typeof search>(
		name: K,
		value: (typeof search)[K],
	) => {
		nvatigate({
			search: (prev) => ({
				...prev,
				...(value ? { [name]: value } : { [name]: undefined }),
			}),
		});
	};

	const handleReset = () => {
		if (keywordInputRef.current) {
			keywordInputRef.current.value = "";
		}
		nvatigate({});
	};

	return (
		<form className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-2">
				<h2 className="font-semibold text-xl">검색</h2>
				<Button
					type="reset"
					variant="link"
					size="sm"
					className="text-muted-foreground"
					onClick={handleReset}
				>
					초기화
				</Button>
			</div>
			<div className="flex flex-col gap-4">
				<Input
					ref={keywordInputRef}
					defaultValue={search.keyword}
					placeholder="검색어를 입력하세요"
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							event.stopPropagation();
							updateSearchParams("keyword", event.currentTarget.value);
						}
					}}
				/>
				<h2 className="font-semibold text-lg">카테고리</h2>
				<RadioGroup
					value={search.categoryId?.toString() || ""}
					onValueChange={(value) => updateSearchParams("categoryId", +value)}
				>
					{CATEGORIES.map((category) => (
						<div key={category.id} className="flex gap-2">
							<RadioGroupItem
								id={`category-${category.id}`}
								value={category.id.toString()}
							/>
							<Label htmlFor={`category-${category.id}`}>{category.name}</Label>
						</div>
					))}
				</RadioGroup>
			</div>
		</form>
	);
}
