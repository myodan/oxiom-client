import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Combobox } from "~/components/ui/combobox";
import { DatePicker } from "~/components/ui/date-picker";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { CATEGORIES } from "~/constants/categories";
import { useCreateProductMutation } from "~/mutations/create-product-mutation";
import { ProductFormSchema } from "~/schemas/forms/product";

export const Route = createFileRoute("/(authorized)/products/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: {
			name: "",
			description: "",
			images: [],
			initialPrice: 1000,
			bidUnit: 1000,
			endDate: undefined,
			categoryId: undefined,
		},
	});

	const { mutate, isPending } = useCreateProductMutation();

	const handleSubmit = form.handleSubmit((values) => {
		mutate(values);
	});

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>상품명</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>설명</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="images"
					render={({ field }) => (
						<FormItem>
							<FormLabel>이미지</FormLabel>
							<FormControl>
								<Input
									accept=".gif, .jpeg, .jpg, .png, .webp"
									multiple
									onChange={(event) =>
										field.onChange(Array.from(event.target.files ?? []))
									}
									type="file"
								/>
							</FormControl>
							<FormMessage />
							{field.value.length !== 0 && (
								<div className="grid grid-cols-6 gap-2">
									{field.value.map((file) => (
										<img
											alt={file.name}
											className="aspect-square rounded-md border object-cover"
											key={file.name}
											src={URL.createObjectURL(file)}
										/>
									))}
								</div>
							)}
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="initialPrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel>시작가</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									onChange={(event) =>
										field.onChange(event.target.valueAsNumber)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bidUnit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>입찰 단위</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									onChange={(event) =>
										field.onChange(event.target.valueAsNumber)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>경매 종료일</FormLabel>
							<FormControl>
								<DatePicker
									onChange={(value) => field.onChange(value?.toISOString())}
									value={field.value ? new Date(field.value) : undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="categoryId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>카테고리</FormLabel>
							<FormControl>
								<Combobox
									onChange={(value) => field.onChange(value && +value)}
									options={CATEGORIES.map((category) => ({
										value: category.id.toString(),
										label: category.name,
									}))}
									placeholder="카테고리를 선택하세요"
									searchPlaceholder="카테고리 검색"
									value={field.value?.toString()}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} type="submit">
					{isPending ? <Loader2Icon className="animate-spin" /> : "등록"}
				</Button>
			</form>
		</Form>
	);
}
