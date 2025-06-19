import { useSuspenseQuery } from "@tanstack/react-query";
import { BellIcon } from "lucide-react";
import type { FC } from "react";
import { currentUserNotificationsQueryOptions } from "~/queries/current-user-notifications-query";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const NotificationMenu: FC = () => {
	const { data: notifications } = useSuspenseQuery(
		currentUserNotificationsQueryOptions(),
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="rounded-full" size="icon" variant="ghost">
					<BellIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<h3 className="mb-2 font-semibold">알림</h3>
				{!notifications || notifications.content.length === 0 ? (
					<div>알림이 없습니다.</div>
				) : (
					<li className="flex list-none flex-col gap-2">
						{notifications?.content.map((notification) => (
							<li
								className="rounded-md bg-accent p-2 text-sm"
								key={notification.id}
							>
								{notification.content}
							</li>
						))}
					</li>
				)}
			</PopoverContent>
		</Popover>
	);
};
