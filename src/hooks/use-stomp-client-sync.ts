import { useEffect } from "react";
import { useStompClientStore } from "~/stores/stomp-client-store";
import { useTokenStore } from "~/stores/token-store";

export function useStompClientSync() {
	const stompClient = useStompClientStore((state) => state.stompClient);
	const accessToken = useTokenStore((state) => state.accessToken);

	useEffect(() => {
		if (stompClient.connected) {
			stompClient.deactivate();
		}

		stompClient.connectHeaders = {
			...(accessToken && { Authorization: `Bearer ${accessToken}` }),
		};

		stompClient.activate();
	}, [accessToken, stompClient]);
}
