import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Logo } from "~/components/common/logo";
import { ThemeSelector } from "~/components/common/theme-selector";
import { UserMenu } from "~/components/common/user-menu";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { currentUserQueryOptions } from "~/queries/current-user";

export function Header() {
	const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions());

	return (
		<header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background **:data-[slot=separator]:h-4">
			<div className="container mx-auto flex max-w-7xl justify-between gap-8 px-4">
				<Logo />
				<ul className="flex items-center gap-4">
					<li>
						<Link
							to="/products"
							className="font-serif text-foreground/75 hover:text-foreground [&.active]:font-bold [&.active]:text-foreground"
						>
							Products
						</Link>
					</li>
				</ul>
				<div className="flex items-center gap-4">
					{currentUser ? (
						<UserMenu />
					) : (
						<Link to="/sign-in">
							<Button variant="ghost" className="font-serif">
								로그인
							</Button>
						</Link>
					)}
					<Separator orientation="vertical" />
					<ThemeSelector />
				</div>
			</div>
		</header>
	);
}
