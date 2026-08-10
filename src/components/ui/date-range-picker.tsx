import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "#/shared/components/ui/button.tsx";
import { Calendar } from "#/shared/components/ui/calendar.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/shared/components/ui/popover.tsx";
import { cn } from "#/shared/lib/utils";

interface DateRangePickerProps {
	value?: DateRange;
	onChange?: (range: DateRange | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	id?: string;
	className?: string;
	numberOfMonths?: number;
}

// Value/onChange controlado, mesmo contrato de DatePicker — pensado para uso
// dentro de <FormControl> do react-hook-form.
export function DateRangePicker({
	value,
	onChange,
	placeholder = "Selecione um período",
	disabled,
	id,
	className,
	numberOfMonths = 2,
}: DateRangePickerProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					id={id}
					disabled={disabled}
					className={cn(
						"w-full justify-start px-2.5 font-normal",
						!value?.from && "text-muted-foreground",
						className,
					)}
				>
					<CalendarIcon className="size-4" />
					{value?.from ? (
						value.to ? (
							<>
								{format(value.from, "dd LLL, y", { locale: ptBR })} –{" "}
								{format(value.to, "dd LLL, y", { locale: ptBR })}
							</>
						) : (
							format(value.from, "dd LLL, y", { locale: ptBR })
						)
					) : (
						placeholder
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="range"
					locale={ptBR}
					defaultMonth={value?.from}
					selected={value}
					onSelect={onChange}
					numberOfMonths={numberOfMonths}
				/>
			</PopoverContent>
		</Popover>
	);
}
