import { z } from "zod/v4";

export const NotificationSchema = z.object({
	id: z.string(),
	userId: z.number().positive(),
	content: z.string(),
	isRead: z.boolean(),
	createdDate: z.iso.datetime(),
});

export type Notification = z.infer<typeof NotificationSchema>;
