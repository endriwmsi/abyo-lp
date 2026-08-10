import * as React from "react";
import { cn } from "#/lib/utils";
import { Input } from "./input";

/** (XX) XXXX-XXXX para fixo (10 dígitos), (XX) XXXXX-XXXX para celular (11). */
function formatPhone(digits: string): string {
	const trimmed = digits.slice(0, 11);

	if (trimmed.length <= 10) {
		return trimmed
			.replace(/^(\d{2})(\d)/, "($1) $2")
			.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
	}

	return trimmed
		.replace(/^(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

function unformatPhone(value: string): string {
	return value.replace(/\D/g, "");
}

export interface PhoneInputProps
	extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
	/** Dígitos sem máscara (DDD + número) — é o que persiste no banco. */
	value?: string | null;
	onChange?: (digits: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
	(
		{ className, value, onChange, placeholder = "(11) 91234-5678", ...props },
		ref,
	) => {
		const digits = unformatPhone(value ?? "").slice(0, 11);
		const displayValue = formatPhone(digits);

		function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
			const rawDigits = unformatPhone(event.target.value).slice(0, 11);
			onChange?.(rawDigits);
		}

		return (
			<Input
				type="tel"
				inputMode="numeric"
				className={cn(className)}
				placeholder={placeholder}
				value={displayValue}
				onChange={handleChange}
				ref={ref}
				{...props}
			/>
		);
	},
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput, formatPhone, unformatPhone };
