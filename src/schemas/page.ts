import { type ZodType, z } from "zod/v4";

export const PageSchema = <T extends ZodType>(contentSchema: T) => {
	return z.object({
		content: z.array(contentSchema),
		page: z.object({
			size: z.number(),
			number: z.number().nonnegative(),
			totalElements: z.number().nonnegative(),
			totalPages: z.number().nonnegative(),
		}),
	});
};

export type Page<T> = z.infer<ReturnType<typeof PageSchema<z.ZodType<T>>>>;
