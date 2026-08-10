import * as React from "react";

import { cn, formatCentsToBRL } from "#/shared/lib/utils";
import { Input } from "./input";

export interface CurrencyInputProps
	extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
	/** Valor em centavos — nunca reais, para bater com a convenção do projeto. */
	value?: number | null;
	onChange?: (valueInCents: number) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
	({ className, value, onChange, placeholder = "R$ 00,00", ...props }, ref) => {
		const displayValue =
			value === null || value === undefined || value === 0
				? ""
				: formatCentsToBRL(value);

		function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
			const digitsOnly = event.target.value.replace(/\D/g, "");
			const cents = digitsOnly === "" ? 0 : Number.parseInt(digitsOnly, 10);
			onChange?.(cents);
		}

		return (
			<Input
				type="text"
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
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput, formatCentsToBRL };
