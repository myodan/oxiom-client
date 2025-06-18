import { zodResolver } from "@hookform/resolvers/zod";
import { formatDuration, intervalToDuration, isBefore } from "date-fns";
import { ko } from "date-fns/locale";
import { Loader2Icon } from "lucide-react";
import { type FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useInterval } from "usehooks-ts";
import { z } from "zod/v4";
import { useShallow } from "zustand/react/shallow";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "~/components/ui/carousel";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useCreateBidMutation } from "~/mutations/create-bid-mutation";
import { BidFormSchema } from "~/schemas/forms/bid";
import type { Product } from "~/schemas/product";
import { useStompClientStore } from "~/stores/stomp-client-store";

export type InfoSectionProps = {
	product: Product;
};

export const InfoSection: FC<InfoSectionProps> = ({ product }) => {
	const form = useForm({
		resolver: zodResolver(
			BidFormSchema.extend({
				price: z.number().min(product.currentPrice + product.bidUnit),
			}),
		),
		values: {
			price: product.currentPrice + product.bidUnit,
		},
	});

	const { mutate, isPending } = useCreateBidMutation(product.id);
	const { isConnected } = useStompClientStore(
		useShallow(({ isConnected }) => ({
			isConnected,
		})),
	);

	const handleSubmit = form.handleSubmit((data) => {
		mutate(data);
	});

	const getRemainingTimeMessage = useCallback(() => {
		const nowDate = new Date();
		const productEndDate = new Date(product.endDate);

		if (isBefore(productEndDate, nowDate)) {
			if (!product.highestBidder) {
				return "입찰자가 없어 패찰되었습니다.";
			}

			return `${product.highestBidder?.displayName || product.highestBidder?.username}님 낙찰`;
		}

		return formatDuration(
			intervalToDuration({
				start: nowDate,
				end: productEndDate,
			}),
			{ locale: ko },
		);
	}, [product]);

	const [durationMessage, setDurationMessage] = useState(
		getRemainingTimeMessage(),
	);

	useInterval(() => {
		setDurationMessage(getRemainingTimeMessage());
	}, 1000);

	return (
		<div className="flex flex-col gap-4 md:flex-row">
			<div className="flex basis-1/2 gap-4">
				<Carousel className="grow">
					<CarouselContent>
						{product.images.map((image) => (
							<CarouselItem className="flex" key={image.id}>
								<img
									alt="Product Preview"
									className="aspect-square grow rounded-lg object-cover"
									src={
										image.objectKey.startsWith("http")
											? image.objectKey
											: `${import.meta.env.PUBLIC_S3_URL}/${image.objectKey}`
									}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
			<div className="flex basis-1/2 flex-col justify-between gap-4">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<div className="flex gap-2">
							<Badge>{product.status}</Badge>
							<Badge>{product.category.name}</Badge>
						</div>
						<h1 className="line-clamp-1 font-bold text-2xl">{product.name}</h1>
					</div>
					<div className="flex flex-col">
						<p className="text-gray-400 text-sm">현재 입찰가</p>
						<p className="font-bold text-3xl text-primary">
							{product.currentPrice.toLocaleString()}원
						</p>
					</div>
					<div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground">
						<p className="text-muted-foreground text-sm">
							경매 종료까지 남은 시간
						</p>
						<p className="font-medium text-lg">{durationMessage}</p>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div className="flex flex-col">
							<p className="text-muted-foreground text-sm">입찰 시작가</p>
							<p className="font-medium">
								{product.initialPrice.toLocaleString()}원
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-muted-foreground text-sm">입찰 단위</p>
							<p className="font-medium">
								{product.bidUnit.toLocaleString()}원
							</p>
						</div>
					</div>
				</div>
				{product.status === "OPEN" ? (
					<Form {...form}>
						<form
							className="flex flex-col gap-2 rounded-md border p-4"
							onSubmit={handleSubmit}
						>
							<h3 className="font-semibold">입찰하기</h3>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												onChange={(event) =>
													field.onChange(event.target.valueAsNumber)
												}
												type="number"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button disabled={isPending || !isConnected} type="submit">
								{isPending ? (
									<Loader2Icon className="animate-spin" />
								) : (
									"입찰하기"
								)}
							</Button>
						</form>
					</Form>
				) : (
					<div className="flex flex-col gap-2 rounded-md border p-4">
						경매가 종료된 상품입니다.
					</div>
				)}
			</div>
		</div>
	);
};
