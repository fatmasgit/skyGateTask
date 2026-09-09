"use client";

import { useEffect, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";

import {
    TableSearch,
} from "@/components/TableSearch";

import { TablePagination } from "@/components/TablePagination";

import type { Elixir, SearchFieldOption, SearchField } from "@/types/wizard";

interface ReusableTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    loading?: boolean;
    error?: boolean;
    pageSize?: number;
    searchFields?: readonly SearchFieldOption[];
    defaultSearchField?: SearchField;
    onSearch?: (field: SearchField, value: string) => void;
    onView?: (row: TData) => void;
}

function truncateText(
    value: string,
    maxLength: number = 15,
): string {
    return value.length > maxLength
        ? `${value.slice(0, maxLength)}...`
        : value;
}

function isElixirArray(value: unknown): value is Elixir[] {
    if (!Array.isArray(value)) {
        return false;
    }

    return value.every(
        (item: unknown): item is Elixir =>
            typeof item === "object" &&
            item !== null &&
            "id" in item &&
            "name" in item &&
            typeof item.id === "string" &&
            typeof item.name === "string",
    );
}

export function ReusableTable<TData>({
    data,
    columns,
    loading = false,
    error = false,
    pageSize = 10,
    searchFields = [],
    defaultSearchField = "FirstName",
    onSearch,
    onView,
}: ReusableTableProps<TData>) {
    const [searchField, setSearchField] =
        useState<SearchField>(defaultSearchField);

    const [searchValue, setSearchValue] =
        useState<string>("");

    const [expandedRows, setExpandedRows] =
        useState<Set<string>>(new Set());

    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize,
            },
        },
    });

    useEffect(() => {
        table.setPageIndex(0);
    }, [data, table]);

    useEffect(() => {
        onSearch?.(searchField, searchValue);
    }, [searchField, searchValue, onSearch]);

    const toggleRow = (rowId: string) => {
        setExpandedRows((prev) => {
            const next = new Set(prev);

            if (next.has(rowId)) {
                next.delete(rowId);
            } else {
                next.add(rowId);
            }

            return next;
        });
    };

    const rows = table.getRowModel().rows;
    const pageCount = table.getPageCount();

    const currentPage =
        table.getState().pagination.pageIndex;

    return (
        <TooltipProvider>
            <div className="space-y-4">
                {searchFields.length > 0 && (
                    <div className="flex w-full items-center justify-between p-5">
                        <span className="ps-2 text-2xl font-manrope-semibold text-primary-text">
                            Master Wizard Registry
                        </span>

                        <TableSearch
                            searchFields={searchFields}
                            searchField={searchField}
                            searchValue={searchValue}
                            onSearchFieldChange={setSearchField}
                            onSearchValueChange={setSearchValue}
                        />
                    </div>
                )}

                {loading ? (
                    <Skeleton className="h-125 w-full rounded-none bg-table-header-background" />
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                {table
                                    .getHeaderGroups()
                                    .map((headerGroup) => (
                                        <TableRow
                                            key={headerGroup.id}
                                            className="h-[72.5px] border-table-row-border bg-table-header-background hover:bg-table-header-background"
                                        >
                                            {headerGroup.headers.map(
                                                (header) => (
                                                    <TableHead
                                                        key={header.id}
                                                        className="px-4 text-[14px] font-manrope-semibold text-secondary-text"
                                                    >
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header
                                                                    .column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext(),
                                                            )}
                                                    </TableHead>
                                                ),
                                            )}

                                            <TableHead className="w-20 px-4 text-[14px] font-manrope-semibold text-secondary-text">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    ))}
                            </TableHeader>

                            <TableBody>
                                {error ? (
                                    <TableRow className="h-[72.5px] border-table-row-border">
                                        <TableCell
                                            colSpan={columns.length + 1}
                                            className="h-[72.5px] border-table-row-border p-4 text-center text-secondary-text"
                                        >
                                            Error fetching wizards.
                                        </TableCell>
                                    </TableRow>
                                ) : rows.length === 0 ? (
                                    <TableRow className="h-[72.5px] border-table-row-border">
                                        <TableCell
                                            colSpan={columns.length + 1}
                                            className="h-[72.5px] border-table-row-border p-4 text-center text-secondary-text"
                                        >
                                            No records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    rows.map((row, rowIndex) => {
                                        const isOddRow =
                                            rowIndex % 2 === 0;

                                        const isExpanded =
                                            expandedRows.has(row.id);

                                        return (
                                            <TableRow
                                                key={row.id}
                                                className="min-h-[72.5px] border-table-row-border"
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => {
                                                        const cellValue: unknown =
                                                            cell.getValue();

                                                        if (
                                                            cell.column.id ===
                                                            "id"
                                                        ) {
                                                            return (
                                                                <TableCell
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                    className="min-h-[72.5px] border-table-row-border p-4 text-purple"
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext(),
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }

                                                        if (
                                                            cell.column.id ===
                                                            "elixirs" &&
                                                            isElixirArray(
                                                                cellValue,
                                                            )
                                                        ) {
                                                            const visibleElixirs =
                                                                isExpanded
                                                                    ? cellValue
                                                                    : cellValue.slice(
                                                                        0,
                                                                        3,
                                                                    );

                                                            const hasMore =
                                                                cellValue.length >
                                                                3;

                                                            return (
                                                                <TableCell
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                    className="min-h-[72.5px] border-table-row-border p-4"
                                                                >
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        {visibleElixirs.map(
                                                                            (
                                                                                elixir: Elixir,
                                                                                index: number,
                                                                            ) => (
                                                                                <Tooltip
                                                                                    key={`${elixir.name}-${index}`}
                                                                                >
                                                                                    <TooltipTrigger
                                                                                        asChild
                                                                                    >
                                                                                        <span
                                                                                            className={
                                                                                                `cursor-default rounded-full border px-2 py-1.5 text-[12px] font-medium ${isOddRow
                                                                                                    ? "border-elixir-yellow-border bg-elixir-yellow-bg text-elixir-yellow"
                                                                                                    : "border-elixir-purple-border bg-elixir-purple-bg text-elixir-purple"
                                                                                                }`
                                                                                            }
                                                                                        >
                                                                                            {truncateText(
                                                                                                elixir.name,
                                                                                            )}
                                                                                        </span>
                                                                                    </TooltipTrigger>

                                                                                    <TooltipContent>
                                                                                        <p>
                                                                                            {
                                                                                                elixir.name
                                                                                            }
                                                                                        </p>
                                                                                    </TooltipContent>
                                                                                </Tooltip>
                                                                            ),
                                                                        )}

                                                                        {hasMore && (
                                                                            <button
                                                                                type="button"
                                                                                aria-label={
                                                                                    isExpanded
                                                                                        ? "Show fewer elixirs"
                                                                                        : "Show more elixirs"
                                                                                }
                                                                                onClick={() =>
                                                                                    toggleRow(
                                                                                        row.id,
                                                                                    )
                                                                                }
                                                                                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-table-border text-secondary-text transition-colors hover:bg-search-bg"
                                                                            >
                                                                                {isExpanded ? (
                                                                                    <ChevronUp className="h-4 w-4" />
                                                                                ) : (
                                                                                    <ChevronDown className="h-4 w-4" />
                                                                                )}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </TableCell>
                                                            );
                                                        }

                                                        return (
                                                            <TableCell
                                                                key={cell.id}
                                                                className="min-h-[72.5px] border-table-row-border p-4 text-[16px] font-manrope-semibold text-primary-text"
                                                            >
                                                                {flexRender(
                                                                    cell
                                                                        .column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext(),
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}

                                                <TableCell className="min-h-[72.5px] border-table-row-border text-[16px] font-manrope-semibold text-secondary-text">
                                                    <button
                                                        type="button"
                                                        aria-label="View wizard"
                                                        onClick={() =>
                                                            onView?.(
                                                                row.original,
                                                            )
                                                        }
                                                        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-secondary-text transition-colors hover:bg-search-bg hover:text-primary-text"
                                                    >
                                                        <Eye className="h-6 w-6" />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>

                        {!error &&
                            rows.length > 0 &&
                            pageCount > 1 && (
                                <TablePagination
                                    pageCount={pageCount}
                                    currentPage={currentPage}
                                    canPreviousPage={table.getCanPreviousPage()}
                                    canNextPage={table.getCanNextPage()}
                                    onPreviousPage={() =>
                                        table.previousPage()
                                    }
                                    onNextPage={() =>
                                        table.nextPage()
                                    }
                                    onPageChange={(page: number) =>
                                        table.setPageIndex(page)
                                    }
                                    totalRecords={data.length}
                                    pageSize={pageSize}
                                />
                            )}
                    </>
                )}
            </div>
        </TooltipProvider>
    );
}