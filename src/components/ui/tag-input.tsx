import { X } from "lucide-react";
import * as React from "react";

import { cn } from "#/shared/lib/utils";
import { Badge } from "./badge";

export interface TagInputProps
	extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
	value: string[];
	onChange: (value: string[]) => void;
}

// Input de múltiplos valores (chips) — usado quando o filtro aceita N termos
// (ex: vários e-mails/CPFs/CNPJs) em vez de um único texto de busca.
const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
	({ className, value, onChange, placeholder, ...props }, ref) => {
		const [draft, setDraft] = React.useState("");
		const inputRef = React.useRef<HTMLInputElement>(null);
		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

		function commitDraft() {
			const term = draft.trim();
			setDraft("");
			if (term.length === 0) return;
			if (value.includes(term)) return;
			onChange([...value, term]);
		}

		function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
			if (event.key === "Enter" || event.key === ",") {
				event.preventDefault();
				commitDraft();
				return;
			}
			if (event.key === "Backspace" && draft.length === 0 && value.length > 0) {
				onChange(value.slice(0, -1));
			}
		}

		function removeTag(tag: string) {
			onChange(value.filter((item) => item !== tag));
		}

		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: só repassa foco pro input interno ao clicar na área do "campo"
			// biome-ignore lint/a11y/useKeyWithClickEvents: input interno já cobre navegação por teclado
			<div
				className={cn(
					"flex h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-transparent px-2 py-1 text-base shadow-xs transition-[color,box-shadow] has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50 md:text-sm dark:bg-input/30",
					className,
				)}
				onClick={() => inputRef.current?.focus()}
			>
				{value.map((tag) => (
					<Badge key={tag} variant="secondary" className="gap-1 pr-1">
						{tag}
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								removeTag(tag);
							}}
							className="rounded-full hover:bg-muted-foreground/20"
						>
							<X className="size-3" />
						</button>
					</Badge>
				))}
				<input
					ref={inputRef}
					type="text"
					data-slot="tag-input"
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={commitDraft}
					placeholder={value.length === 0 ? placeholder : undefined}
					className="h-7 min-w-24 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
					{...props}
				/>
			</div>
		);
	},
);
TagInput.displayName = "TagInput";

export { TagInput };
