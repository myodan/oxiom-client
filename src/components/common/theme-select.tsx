import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useThemeStore } from "~/stores/theme-store";

export const ThemeSelect: FC = () => {
	const { theme, setTheme } = useThemeStore();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					{theme === "light" && <SunIcon />}
					{theme === "dark" && <MoonIcon />}
					{theme === "system" && <MonitorIcon />}
					<span className="sr-only">테마 선택</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>테마</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<SunIcon />
					라이트
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<MoonIcon />
					다크
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<MonitorIcon />
					시스템
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
