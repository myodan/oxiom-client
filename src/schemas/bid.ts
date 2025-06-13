import { z } from "zod/v4";
import { UserSchema } from "./user";

export const BidSchema = z.object({
	id: z.number().positive(),
	price: z.number().positive(),
	createdBy: UserSchema,
	createdDate: z.iso.datetime(),
});

export type Bid = z.infer<typeof BidSchema>;
