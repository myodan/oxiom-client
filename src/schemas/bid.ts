import { z } from "zod/v4";
import { ProductSummarySchema } from "./product";
import { UserSchema } from "./user";

export const BidSchema = z.object({
	id: z.number().positive(),
	product: ProductSummarySchema,
	price: z.number().positive(),
	createdBy: UserSchema,
	createdDate: z.iso.datetime(),
});

export type Bid = z.infer<typeof BidSchema>;

export const ProductBidSchema = BidSchema.omit({
	product: true,
});

export type ProductBid = z.infer<typeof ProductBidSchema>;

export const UserBidSchema = BidSchema.omit({
	createdBy: true,
});

export type UserBid = z.infer<typeof UserBidSchema>;
