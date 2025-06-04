import { z } from "zod/v4";

export const TokenShema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

export type Token = z.infer<typeof TokenShema>;
