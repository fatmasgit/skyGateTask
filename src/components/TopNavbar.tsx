import { Bell, Search, Settings } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export function TopNavbar() {
    return (
        <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-layout-border bg-dashboard-background px-6 shadow-[0px_0px_20px_0px_hsla(258,100%,87%,0.15)] backdrop-blur-[24px]">
            <div className="flex items-center gap-20">
                <h1 className="text-2xl font-manrope-bold text-yellow">
                    Wizarding Registry
                </h1>

                <div className="relative hidden w-80 md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" />

                    <Input
                        placeholder="Scrying records..."
                        className="h-9 rounded-full border-0 bg-search-bg pl-10 text-sm text-primary-text placeholder:text-secondary-text"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-secondary-text hover:bg-search-bg hover:text-primary-text"
                >
                    <Bell className="h-5 w-5" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-secondary-text hover:bg-search-bg hover:text-primary-text"
                >
                    <Settings className="h-5 w-5" />
                </Button>

                <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback className="bg-search-bg text-primary-text">
                        W
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}