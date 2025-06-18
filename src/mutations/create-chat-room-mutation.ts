import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { fetcher } from "~/lib/fetcher";
import { ChatRoomSchema } from "~/schemas/chat-room";
import type { ChatRoomForm } from "~/schemas/forms/chat-room";

export const useCreateChatRoomMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["create-chat-room"],
		mutationFn: async (data: ChatRoomForm) => {
			const response = await fetcher.post(`chat-rooms`, { json: data });
			const body = await response.json();
			return ChatRoomSchema.parse(body);
		},
		onSuccess: (data) => {
			navigate({ to: `/chat-rooms/${data.id}` });
		},
		onError: (error) => {
			console.error(error);
			toast.error("채팅방 등록 중 오류가 발생했습니다.");
		},
	});
};
