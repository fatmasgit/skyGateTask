"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
    pageCount: number;
    currentPage: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onPageChange: (page: number) => void;
    totalRecords: number;
    pageSize: number;
}

export function TablePagination({
    pageCount,
    currentPage,
    canPreviousPage,
    canNextPage,
    onPreviousPage,
    onNextPage,
    onPageChange,
    totalRecords,
    pageSize,
}: TablePaginationProps) {
    const startRecord =
        totalRecords === 0 ? 0 : currentPage * pageSize + 1;

    const endRecord = Math.min(
        (currentPage + 1) * pageSize,
        totalRecords,
    );

    return (
        <div className="flex h-[72px] w-full items-center bg-table-header-background px-5 ">
            {/* Records count */}
            <p className="text-sm text-secondary-text">
                Showing {startRecord.toLocaleString()}-
                {endRecord.toLocaleString()} of{" "}
                {totalRecords.toLocaleString()} Records
            </p>

            {/* Pagination */}
            <Pagination className="mx-0 ml-auto w-auto justify-end">
                <PaginationContent className="gap-1">
                    {/* Previous */}
                    <PaginationItem>
                        <button
                            type="button"
                            onClick={onPreviousPage}
                            disabled={!canPreviousPage}
                            aria-label="Previous page"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border-0 bg-transparent p-0 text-secondary-text shadow-none outline-none transition-colors hover:bg-transparent hover:text-primary-text disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus:ring-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                    </PaginationItem>

                    {/* Pages */}
                    {Array.from({ length: pageCount }, (_, page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={(
                                    e: React.MouseEvent<HTMLAnchorElement>,
                                ) => {
                                    e.preventDefault();
                                    onPageChange(page);
                                }}
                                className={
                                    currentPage === page
                                        ? "border-0 bg-purple-button text-dark-purple hover:bg-purple-button hover:text-dark-purple"
                                        : "border-0 bg-transparent text-secondary-text hover:bg-transparent hover:text-primary-text"
                                }
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Next */}
                    <PaginationItem>
                        <button
                            type="button"
                            onClick={onNextPage}
                            disabled={!canNextPage}
                            aria-label="Next page"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border-0 bg-transparent p-0 text-secondary-text shadow-none outline-none transition-colors hover:bg-transparent hover:text-primary-text disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus:ring-0"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}