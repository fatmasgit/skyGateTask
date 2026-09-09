import {
    BookOpen,
    FlaskConical,
    Grid2X2,
    HelpCircle,
    Settings,
    Users,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

import RegistryImage from "@/assets/images/Registry.webp";
import RegistryFallback from "@/assets/images/Registry.png";

const menuItems = [
    {
        title: "Dashboard",
        icon: Grid2X2,
        path: "/",
    },
    {
        title: "Wizards",
        icon: Users,
        path: "/wizards",
    },
    {
        title: "Elixirs",
        icon: FlaskConical,
        path: "/elixirs",
    },
    {
        title: "Archives",
        icon: BookOpen,
        path: "/archives",
    },
];

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar
            collapsible="none"
            className="h-full w-64 shrink-0 border-r border-layout-border bg-sidebar-background text-sidebar-foreground"
        >
            <SidebarContent className="overflow-hidden bg-sidebar-background">
                {/* Header */}
                <div className="text-center">
                    {/* Registry Profile */}
                    <div className="px-5 pb-8 pt-7">
                        {/* Registry Image */}
                        <div className="mx-auto mb-3 flex h-17 w-17 items-center justify-center overflow-hidden rounded-xl">
                            <picture>
                                <source
                                    srcSet={RegistryImage}
                                    type="image/webp"
                                />

                                <img
                                    src={RegistryFallback}
                                    alt="Registry"
                                    className="h-full w-full object-cover"
                                />
                            </picture>
                        </div>

                        {/* Registry Name */}
                        <p className="text-[16px] font-manrope-extrabold text-yellow">
                            Registry
                        </p>

                        {/* Registry Description */}
                        <p className="mt-1 text-[12px] font-manrope-medium text-secondary-text">
                            Ministry of Alchemical Records
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <SidebarGroup className="mt-6 px-2 text-[14px] font-manrope-semibold">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;

                                const isActive =
                                    location.pathname === item.path;

                                return (
                                    <SidebarMenuItem
                                        key={item.title}
                                        className="px-2"
                                    >
                                        <SidebarMenuButton
                                            asChild
                                            className={
                                                isActive
                                                    ? "relative h-11 rounded-md bg-elixir-yellow-bg text-yellow hover:bg-elixir-yellow-bg focus:bg-elixir-yellow-bg"
                                                    : "h-11 rounded-md text-secondary-text hover:bg-search-bg focus:bg-sidebar-background"
                                            }
                                        >
                                            <Link to={item.path}>
                                                <Icon className="h-5 w-5" />

                                                <span>{item.title}</span>

                                                {isActive && (
                                                    <span className="absolute right-0 top-0 h-full w-0.5 bg-yellow" />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="shrink-0 bg-sidebar-background text-[14px] font-manrope-semibold">
                <Button className="h-11 w-full bg-purple-button text-dark-purple hover:bg-purple-button">
                    + New Elixir
                </Button>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="h-11 justify-center text-secondary-text hover:bg-search-bg focus:bg-sidebar-background">
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton className="h-11 justify-center text-secondary-text hover:bg-search-bg focus:bg-sidebar-background">
                            <HelpCircle className="h-5 w-5" />
                            <span>Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}