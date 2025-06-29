import { z } from "zod/v4";
import { CategorySchema } from "./category";
import { ProductImageSchema } from "./product-image";
import { UserSchema } from "./user";

export const ProductSchema = z.object({
	id: z.number().positive(),
	name: z.string(),
	description: z.string(),
	thumbnail: z.string(),
	images: z.array(ProductImageSchema),
	highestBidder: UserSchema.nullable(),
	bidUnit: z.number().positive(),
	initialPrice: z.number().nonnegative(),
	currentPrice: z.number().nonnegative(),
	endDate: z.iso.datetime(),
	category: CategorySchema,
	status: z.enum(["OPEN", "CLOSED", "ENDED", "FAILED"]),
	createdBy: UserSchema,
	createdDate: z.iso.datetime(),
	lastModifiedDate: z.iso.datetime().nullable(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductSummarySchema = ProductSchema.omit({ images: true });

export type ProductSummary = z.infer<typeof ProductSummarySchema>;

export const UserProductSchema = ProductSchema.omit({
	images: true,
	createdBy: true,
});

export type UserProduct = z.infer<typeof UserProductSchema>;
