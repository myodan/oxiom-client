import { Client as StompClient } from "@stomp/stompjs";
import { create } from "zustand";

type StompClientState = {
	stompClient: StompClient;
	isConnected: boolean;
};

export const useStompClientStore = create<StompClientState>((set) => {
	return {
		stompClient: new StompClient({
			brokerURL: import.meta.env.PUBLIC_WEBSOCKET_URL,
			onConnect: () => {
				set({ isConnected: true });
			},
			onDisconnect: () => {
				set({ isConnected: false });
			},
			onStompError: () => {
				set({ isConnected: false });
			},
		}),
		isConnected: false,
	};
});
