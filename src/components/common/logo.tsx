import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { cn } from "~/lib/utils";

export type LogoProps = LinkComponentProps;

export function Logo({ className, ...rest }: LogoProps) {
	return (
		<Link
			className={cn("select-none font-black text-2xl text-primary", className)}
			to="/"
			{...rest}
		>
			Oxiom
		</Link>
	);
}
