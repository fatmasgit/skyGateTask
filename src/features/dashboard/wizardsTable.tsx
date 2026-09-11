"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { ReusableTable } from "@/components/ReusableTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useWizards } from "@/hooks/useWizards";
import type {
    SearchField,
    SearchFieldOption,
    Wizard,
} from "@/types/wizard";

const searchFields: SearchFieldOption[] = [
    {
        value: "FirstName",
        label: "First Name",
    },
    {
        value: "LastName",
        label: "Last Name",
    },
];

const columns: ColumnDef<Wizard>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.original.id;

            return (
                <span className="text-xs text-purple">
                    {id ? `${id.slice(0, 8)}...${id.slice(-6)}` : "—"}
                </span>
            );
        },
    },
    {
        accessorKey: "firstName",
        header: "First Name",
        cell: ({ row }) => (
            <span className="text-primary-text">
                {row.original.firstName ?? "—"}
            </span>
        ),
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        cell: ({ row }) => (
            <span className="text-primary-text">
                {row.original.lastName ?? "—"}
            </span>
        ),
    },
    {
        accessorKey: "elixirs",
        header: "Associated Elixirs",
        cell: ({ row }) => {
            const elixirs = row.original.elixirs;

            if (elixirs.length === 0) {
                return (
                    <span className="text-secondary-text">
                        None registered
                    </span>
                );
            }

            return (
                <div className="flex flex-wrap gap-1 text-primary-text">
                    {elixirs.map((elixir) => (
                        <span key={elixir.id}>{elixir.name}</span>
                    ))}
                </div>
            );
        },
    },
];

export default function WizardsTable() {
    const [searchField, setSearchField] =
        useState<SearchField>("FirstName");

    const [searchValue, setSearchValue] = useState("");

    const debouncedSearch = useDebounce(searchValue, 400);
    const search = debouncedSearch.trim();

    const {
        data: wizards = [],
        isLoading,
        isError,
    } = useWizards(searchField, search);

    return (
        <div className="w-236 rounded-[12px] border border-table-border">
            <ReusableTable
                data={wizards}
                columns={columns}
                loading={isLoading}
                error={isError}
                pageSize={5}
                searchFields={searchFields}
                searchField={searchField}
                searchValue={searchValue}
                setSearchField={setSearchField}
                setSearchValue={setSearchValue}
            />
        </div>
    );
}