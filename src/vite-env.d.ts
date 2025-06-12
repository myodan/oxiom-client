/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly PUBLIC_API_URL: string;
	readonly PUBLIC_WEBSOCKET_URL: string;
	readonly PUBLIC_S3_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
