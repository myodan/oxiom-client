import { z } from "zod/v4";

export const ProductImageSchema = z.object({
	id: z.number().positive(),
	order: z.number().nonnegative(),
	url: z.url(),
});

export type ProductImage = z.infer<typeof ProductImageSchema>;
