import { UserIcon } from "lucide-react";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useCreateChatRoomMutation } from "~/mutations/create-chat-room-mutation";
import type { User } from "~/schemas/user";

export type SellerSectionProps = {
	seller: User;
};

export const SellerSection: FC<SellerSectionProps> = ({ seller }) => {
	const { mutate } = useCreateChatRoomMutation();

	const handleClick = () => {
		mutate({ userId: seller.id });
	};

	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4">
			<h3 className="font-semibold text-lg">판매자 정보</h3>
			<div className="flex items-center gap-4">
				<Avatar className="size-24 rounded-full border [&_svg]:size-16">
					<AvatarImage src={seller.avatarUrl || undefined} />
					<AvatarFallback>
						<UserIcon />
					</AvatarFallback>
				</Avatar>
				<div className="flex grow flex-col">
					<span className="font-semibold text-lg">
						{seller.displayName || seller.username || "이름 없음"}
					</span>
					<span className="text-muted-foreground text-sm">
						{seller.email || "이메일 없음"}
					</span>
				</div>
				<div>
					<Button onClick={handleClick}>채팅하기</Button>
				</div>
			</div>
		</div>
	);
};
