import { z } from "zod/v4";
import { CategorySchema } from "./category";
import { ProductImageSchema } from "./product-image";
import { UserSchema } from "./user";

export const ProductSchema = z.object({
	id: z.number().positive(),
	name: z.string(),
	description: z.string(),
	thumbnailUrl: z.url(),
	images: z.array(ProductImageSchema),
	highestBidder: UserSchema.nullable(),
	bidUnit: z.number().positive(),
	initialPrice: z.number().nonnegative(),
	currentPrice: z.number().nonnegative(),
	endDate: z.iso.datetime(),
	category: CategorySchema,
	createdBy: UserSchema,
	createdDate: z.iso.datetime(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductSummarySchema = ProductSchema.omit({ images: true });

export type ProductSummary = z.infer<typeof ProductSummarySchema>;
