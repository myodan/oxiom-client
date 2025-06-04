import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { cn } from "~/lib/utils";

export type LogoProps = LinkComponentProps;

export function Logo({ className, ...rest }: LogoProps) {
	return (
		<Link
			to="/"
			className={cn("select-none font-black font-serif text-2xl", className)}
			{...rest}
		>
			Oxiom
		</Link>
	);
}
