"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import type { SearchFieldOption, SearchField } from "@/types/wizard";

interface TableSearchProps {
    searchFields: SearchFieldOption[];
    searchField: SearchField;
    searchValue: string;
    setSearchField: (value: SearchField) => void;
    setSearchValue: (value: string) => void;
}

export function TableSearch({
    searchFields,
    searchField,
    searchValue,
    setSearchField,
    setSearchValue,
}: TableSearchProps) {
    console.debug("[TableSearch] render", { searchField, searchValue });

    return (
        <div className="relative ml-2 w-[449.25px]">
            <div className="flex h-[54px] w-full items-center rounded-xl border border-search-border bg-search-bg shadow-[0px_0px_20px_0px_hsla(258,100%,87%,0.15)] backdrop-blur-[24px]">
                <Search className="ml-3 mr-1.5 h-4 w-4 shrink-0 text-search-icon" />

                <Input
                    value={searchValue}
                    onChange={(e) => {
                        console.debug("[TableSearch] search value:", e.target.value);
                        setSearchValue(e.target.value);
                    }}
                    placeholder="Search wizards..."
                    className="h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-search-text shadow-none placeholder:text-search-text focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Select
                    value={searchField}
                    onValueChange={(value) => {
                        console.debug("[TableSearch] search field:", value);
                        setSearchField(value as SearchField);
                    }}
                >
                    <SelectTrigger className="h-full w-[120px] shrink-0 justify-start gap-2 rounded-none border-0 border-l border-search-border px-4 text-xs text-search-icon shadow-none focus:ring-0 focus:ring-offset-0 [&>svg:last-child]:hidden">
                        <SlidersHorizontal className="h-4 w-4 shrink-0 text-search-icon" />
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>

                    <SelectContent
                        position="popper"
                        align="end"
                        side="bottom"
                        sideOffset={6}
                        className="w-[449.25px] min-w-0 rounded-xl border-search-border bg-[hsl(212_36%_17%)] p-1 shadow-lg"
                    >
                        {searchFields.map((field) => (
                            <SelectItem
                                key={field.value}
                                value={field.value}
                                className="rounded-lg text-sm text-search-icon focus:bg-muted"
                            >
                                {field.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}