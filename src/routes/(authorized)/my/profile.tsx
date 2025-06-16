import { createFileRoute } from "@tanstack/react-router";
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const Route = createFileRoute("/(authorized)/my/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { currentUser } = Route.useRouteContext();

	return (
		<>
			<h1 className="font-semibold text-2xl">정보</h1>
			<Card>
				<CardHeader>
					<CardTitle>프로필</CardTitle>
				</CardHeader>
				<CardContent className="flex items-center gap-4">
					<Avatar className="size-24 rounded-full border [&_svg]:size-16">
						<AvatarImage src={currentUser.avatarUrl || undefined} />
						<AvatarFallback>
							<UserIcon />
						</AvatarFallback>
					</Avatar>
					<div className="flex grow flex-col">
						<span className="font-semibold text-lg">
							{currentUser.displayName || currentUser.username || "이름 없음"}
						</span>
						<span className="text-muted-foreground text-sm">
							{currentUser.email || "이메일 없음"}
						</span>
					</div>
					<div>
						<Button>수정</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
