import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	type RowSelectionState,
	useReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { Button } from "#/shared/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/shared/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/shared/components/ui/table";

export interface DataTablePagination {
	page: number;
	pageSize: number;
	totalCount: number;
	pageSizeOptions?: number[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	emptyMessage?: ReactNode;
	// Chave estável por linha (ex.: `row.id`) — necessária para a seleção
	// sobreviver à troca de página, já que `data` é recriada a cada fetch.
	getRowId?: (row: TData) => string;
	rowSelection?: RowSelectionState;
	onRowSelectionChange?: (selection: RowSelectionState) => void;
	// Opcional — quando omitido, toda linha é selecionável (comportamento
	// anterior). Usado, por ex., para impedir selecionar solicitações já
	// pagas na tela de "pagar selecionadas".
	enableRowSelection?: (row: TData) => boolean;
	// Omitido = sem controles de paginação (comportamento anterior); os
	// search params da URL continuam sendo a fonte de verdade, este
	// componente só renderiza a UI e dispara os callbacks.
	pagination?: DataTablePagination;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Paginação/ordenação/filtro continuam vivendo na URL (seção 2) — esta
// tabela é só apresentação, sem `getPaginationRowModel`/`getSortedRowModel`
// (nenhum estado interno do TanStack Table controla o que já é controlado
// pelos search params da rota). Seleção de linha é a única exceção: quando
// `getRowId` é passado, ela é controlada pelo chamador via `rowSelection`/
// `onRowSelectionChange`, o que permite persistir seleção entre páginas.
export function DataTable<TData, TValue>({
	columns,
	data,
	emptyMessage = "Nenhum resultado encontrado.",
	getRowId,
	rowSelection,
	onRowSelectionChange,
	enableRowSelection,
	pagination,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: getRowId ? (row) => getRowId(row) : undefined,
		enableRowSelection: onRowSelectionChange
			? enableRowSelection
				? (row) => enableRowSelection(row.original)
				: true
			: false,
		state: rowSelection ? { rowSelection } : undefined,
		onRowSelectionChange: onRowSelectionChange
			? (updater) => {
					const next =
						typeof updater === "function"
							? updater(rowSelection ?? {})
							: updater;
					onRowSelectionChange(next);
				}
			: undefined,
	});

	const totalPages = pagination
		? Math.max(1, Math.ceil(pagination.totalCount / pagination.pageSize))
		: 1;

	return (
		<div className="flex flex-col gap-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="odd:bg-muted/20"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-[calc(100vh-450px)] text-center text-muted-foreground"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{pagination && (
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span>Resultados por página</span>
						<Select
							value={String(pagination.pageSize)}
							onValueChange={(value) =>
								pagination.onPageSizeChange(Number(value))
							}
						>
							<SelectTrigger className="w-20">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{(pagination.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS).map(
									(size) => (
										<SelectItem key={size} value={String(size)}>
											{size}
										</SelectItem>
									),
								)}
							</SelectContent>
						</Select>
						<span>
							{pagination.totalCount} resultado(s) · página {pagination.page} de{" "}
							{totalPages}
						</span>
					</div>

					<div className="flex items-center gap-1">
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={pagination.page <= 1}
							onClick={() => pagination.onPageChange(1)}
						>
							«
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={pagination.page <= 1}
							onClick={() => pagination.onPageChange(pagination.page - 1)}
						>
							Anterior
						</Button>
						{buildPageNumbers(pagination.page, totalPages).map((item, index) =>
							item === "..." ? (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: separadores "..." não têm identidade própria
									key={`ellipsis-${index}`}
									className="px-2 text-sm text-muted-foreground"
								>
									…
								</span>
							) : (
								<Button
									key={item}
									type="button"
									variant={item === pagination.page ? "default" : "outline"}
									size="sm"
									onClick={() => pagination.onPageChange(item)}
								>
									{item}
								</Button>
							),
						)}
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={pagination.page >= totalPages}
							onClick={() => pagination.onPageChange(pagination.page + 1)}
						>
							Próxima
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={pagination.page >= totalPages}
							onClick={() => pagination.onPageChange(totalPages)}
						>
							»
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	const pages = new Set<number>([1, total, current]);
	for (let offset = 1; offset <= 2; offset++) {
		if (current - offset >= 1) pages.add(current - offset);
		if (current + offset <= total) pages.add(current + offset);
	}

	const sorted = [...pages].sort((a, b) => a - b);
	const result: (number | "...")[] = [];
	for (let i = 0; i < sorted.length; i++) {
		if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
		result.push(sorted[i]);
	}
	return result;
}
