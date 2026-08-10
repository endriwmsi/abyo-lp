import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "#/shared/components/ui/button.tsx";
import { Calendar } from "#/shared/components/ui/calendar.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/shared/components/ui/popover.tsx";
import { cn } from "#/shared/lib/utils";

interface DatePickerProps {
	value?: Date | null;
	onChange?: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	id?: string;
	className?: string;
}

// Value/onChange controlado (mesmo contrato de ValueInput/PhoneInput/etc.) —
// pensado para ser usado dentro de <FormControl> do react-hook-form, não
// depende de nenhum contexto de formulário próprio.
export function DatePicker({
	value,
	onChange,
	placeholder = "Selecione uma data",
	disabled,
	id,
	className,
}: DatePickerProps) {
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
						!value && "text-muted-foreground",
						className,
					)}
				>
					<CalendarIcon className="size-4" />
					{value ? format(value, "PPP", { locale: ptBR }) : placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					locale={ptBR}
					selected={value ?? undefined}
					defaultMonth={value ?? undefined}
					onSelect={(date) => {
						onChange?.(date);
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
