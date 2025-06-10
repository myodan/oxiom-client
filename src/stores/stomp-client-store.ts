import { Client as StompClient } from "@stomp/stompjs";
import { create } from "zustand";

type StompClientState = {
	stompClient: StompClient;
};

export const useStompClientStore = create<StompClientState>(() => {
	return {
		stompClient: new StompClient({
			brokerURL: import.meta.env.PUBLIC_WEBSOCKET_URL,
		}),
	};
});
