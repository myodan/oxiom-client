import { z } from "zod/v4";

export const BidFormSchema = z.object({
	price: z.number().positive(),
});

export type BidForm = z.infer<typeof BidFormSchema>;
