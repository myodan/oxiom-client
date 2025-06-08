import { z } from "zod/v4";

export const ChatMessageSchema = z.object({
	id: z.string(),
	chatRoomId: z.number().positive(),
	senderId: z.number().positive(),
	content: z.string(),
	createdDate: z.iso.datetime(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
