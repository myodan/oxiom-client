import { z } from "zod/v4";

export const ChatMessageFormSchema = z.object({
	content: z.string().nonempty(),
});
