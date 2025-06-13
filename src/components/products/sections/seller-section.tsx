import { UserIcon } from "lucide-react";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { User } from "~/schemas/user";

export type SellerSectionProps = {
	seller: User;
};

export const SellerSection: FC<SellerSectionProps> = ({ seller }) => {
	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4">
			<h3 className="font-semibold font-serif text-lg">판매자 정보</h3>
			<Avatar>
				<AvatarImage src={seller.avatarUrl || ""} />
				<AvatarFallback>
					<UserIcon className="size-4 fill-secondary-foreground" />
				</AvatarFallback>
			</Avatar>
		</div>
	);
};
