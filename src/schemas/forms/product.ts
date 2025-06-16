import { z } from "zod/v4";

export const ProductFormSchema = z.object({
	name: z.string().nonempty(),
	description: z.string().nonempty(),
	images: z
		.array(
			z.file().mime(["image/gif", "image/jpeg", "image/png", "image/webp"]),
		)
		.nonempty(),
	bidUnit: z.number().min(1000),
	initialPrice: z.number().min(1000),
	endDate: z.iso.datetime(),
	categoryId: z.number(),
});

export type ProductForm = z.infer<typeof ProductFormSchema>;
