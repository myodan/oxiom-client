import { z } from "zod/v4";
import { ChatMessageSchema } from "./chat-message";
import { UserSchema } from "./user";

export const ChatRoomSchema = z.object({
	id: z.number().positive(),
	user1: UserSchema,
	user2: UserSchema,
	lastChatMessage: ChatMessageSchema.nullable(),
	createdDate: z.iso.datetime(),
});

export type ChatRoom = z.infer<typeof ChatRoomSchema>;
