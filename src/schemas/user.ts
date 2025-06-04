import { z } from "zod/v4";

export const UserSchema = z.object({
	id: z.number().positive(),
	username: z.string(),
	email: z.email(),
	displayName: z.string().nullable(),
	avatarUrl: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
