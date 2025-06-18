import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { type FC, useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export type ComboboxProps = {
	onChange?: (value?: string) => void;
	value?: string;
	options: { label: string; value: string }[];
	placeholder?: string;
	searchPlaceholder?: string;
};

export const Combobox: FC<ComboboxProps> = ({
	onChange,
	value,
	options,
	placeholder,
	searchPlaceholder,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger asChild>
				<Button
					aria-expanded={open}
					className="justify-between"
					variant="outline"
				>
					{value
						? options.find((option) => option.value === value)?.label
						: placeholder}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-auto p-0">
				<Command>
					<CommandInput className="h-9" placeholder={searchPlaceholder} />
					<CommandList>
						<CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									onSelect={(selectedLabel) => {
										const selectedOption = options.find(
											(option) => option.label === selectedLabel,
										);
										onChange?.(
											selectedOption?.value !== value
												? selectedOption?.value
												: undefined,
										);
										setOpen(false);
									}}
									value={option.label}
								>
									{option.label}
									<CheckIcon
										className={cn(
											"ml-auto",
											value === option.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
