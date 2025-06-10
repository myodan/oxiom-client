import { z } from "zod/v4";

export const ProductFormSchema = z.object({
	name: z.string(),
	description: z.string(),
	images: z.array(z.file().mime(["image/*"])),
	bidUnit: z.coerce.number().min(1000),
	initialPrice: z.coerce.number().min(1000),
	endDate: z.iso.date(),
	categoryId: z.string(),
});

export type ProductForm = z.infer<typeof ProductFormSchema>;
