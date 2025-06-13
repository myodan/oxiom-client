import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	LogOutIcon,
	MessageSquareIcon,
	UserCog2Icon,
	UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSignOutMutation } from "~/mutations/sign-out-mutation";
import { currentUserQueryOptions } from "~/queries/current-user-query";

export function UserMenu() {
	const navigate = useNavigate();
	const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions());
	const { mutate: signOutMutation } = useSignOutMutation();

	if (!currentUser) {
		throw new Error("사용자 정보가 없습니다. 로그인 상태를 확인하세요.");
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="rounded-full border">
				<Avatar className="cursor-pointer">
					<AvatarImage
						src={currentUser.avatarUrl ?? undefined}
						alt="사용자 프로필 이미지"
					/>
					<AvatarFallback>
						<UserIcon className="size-4 fill-secondary-foreground" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="flex flex-col">
					<span className="truncate font-medium text-foreground text-sm">
						{currentUser.displayName || currentUser.username}
					</span>
					<span className="truncate text-muted-foreground text-xs">
						{currentUser.email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => navigate({ to: "/my" })}>
					<UserCog2Icon /> 내 정보
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => navigate({ to: "/chat-rooms" })}>
					<MessageSquareIcon /> 채팅
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOutMutation()}>
					<LogOutIcon />
					로그아웃
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
