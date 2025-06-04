import { z } from "zod/v4";

export const CategorySchema = z.object({
	id: z.number().positive(),
	name: z.string(),
});
