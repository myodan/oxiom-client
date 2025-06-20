import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useThemeStore } from "~/stores/theme-store";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme } = useThemeStore();

	return (
		<Sonner
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			theme={theme as ToasterProps["theme"]}
			{...props}
		/>
	);
};

export { Toaster };
