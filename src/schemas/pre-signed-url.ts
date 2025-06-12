import { z } from "zod/v4";

export const PreSignedUrlSchema = z.object({
	url: z.url(),
	key: z.string(),
	expiresIn: z.number(),
});

export type PreSignedUrl = z.infer<typeof PreSignedUrlSchema>;
