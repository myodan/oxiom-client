import { z } from "zod/v4";

export const ChatRoomFormSchema = z.object({
	userId: z.number(),
});

export type ChatRoomForm = z.infer<typeof ChatRoomFormSchema>;
