import * as React from "react";

import { cn } from "#/shared/lib/utils";
import { Input } from "./input";

/** XXX.XXX.XXX-XX */
function formatCPF(digits: string): string {
	return digits
		.slice(0, 11)
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/** XX.XXX.XXX/XXXX-XX */
function formatCNPJ(digits: string): string {
	return digits
		.slice(0, 14)
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function unformatDocument(value: string): string {
	return value.replace(/\D/g, "");
}

export interface DocumentInputProps
	extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
	/**
	 * "auto" detecta CPF (até 11 dígitos) vs CNPJ (12-14 dígitos) enquanto o
	 * usuário digita e troca a máscara sozinho — usado pelo campo unificado
	 * "Documento" do form builder, que não obriga o admin a escolher entre
	 * CPF e CNPJ na hora de montar o serviço.
	 */
	documentType: "cpf" | "cnpj" | "auto";
	/** Dígitos sem máscara — é o que persiste no banco (seção 5.1). */
	value?: string | null;
	onChange?: (digits: string) => void;
}

const DEFAULT_PLACEHOLDER: Record<DocumentInputProps["documentType"], string> =
	{
		cpf: "000.000.000-00",
		cnpj: "00.000.000/0000-00",
		auto: "CPF ou CNPJ",
	};

function formatDocument(
	digits: string,
	documentType: DocumentInputProps["documentType"],
): string {
	if (documentType === "cpf") return formatCPF(digits);
	if (documentType === "cnpj") return formatCNPJ(digits);
	return digits.length > 11 ? formatCNPJ(digits) : formatCPF(digits);
}

const DocumentInput = React.forwardRef<HTMLInputElement, DocumentInputProps>(
	(
		{ className, documentType, value, onChange, placeholder, ...props },
		ref,
	) => {
		const maxDigits = documentType === "cpf" ? 11 : 14;
		const digits = unformatDocument(value ?? "").slice(0, maxDigits);
		const displayValue = formatDocument(digits, documentType);

		function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
			const rawDigits = unformatDocument(event.target.value).slice(
				0,
				maxDigits,
			);
			onChange?.(rawDigits);
		}

		return (
			<Input
				type="text"
				inputMode="numeric"
				className={cn(className)}
				placeholder={placeholder ?? DEFAULT_PLACEHOLDER[documentType]}
				value={displayValue}
				onChange={handleChange}
				ref={ref}
				{...props}
			/>
		);
	},
);
DocumentInput.displayName = "DocumentInput";

export { DocumentInput, formatCPF, formatCNPJ, unformatDocument };
