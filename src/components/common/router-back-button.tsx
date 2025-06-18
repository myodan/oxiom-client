import { useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../ui/button";

export const RouterBackButton = () => {
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.history.back();
	}, [router]);

	return (
		<Button onClick={handleClick} variant="outline">
			<ArrowLeftIcon />
			<p className="hidden md:flex">돌아가기</p>
		</Button>
	);
};
