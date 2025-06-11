import { ChevronDownIcon } from "lucide-react";
import { type ComponentProps, type FC, useState } from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = {
	onChange?: (value?: Date) => void;
	value?: Date;
	placeholder?: string;
	calendarProps?: Omit<
		ComponentProps<typeof Calendar>,
		"mode" | "selected" | "onSelect"
	>;
};

export const DatePicker: FC<DatePickerProps> = ({
	onChange,
	value,
	placeholder = "날짜를 선택하세요",
	calendarProps,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="justify-between font-normal">
					{value ? value.toLocaleDateString() : placeholder}
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto overflow-hidden p-0" align="end">
				<Calendar
					mode="single"
					selected={value}
					onSelect={(date) => {
						onChange?.(date);
						setOpen(false);
					}}
					{...calendarProps}
				/>
			</PopoverContent>
		</Popover>
	);
};
