import { Outlet } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { AppSidebar } from "@/components/AppSidebar";

export default function AppLayout() {
    return (
        <SidebarProvider>
            <div className="flex h-dvh w-full flex-col overflow-hidden bg-dashboard-background">
                {/* Top Navbar */}
                <TopNavbar />

                {/* Content Area */}
                <div className="flex min-h-0 flex-1">
                    {/* Sidebar */}
                    <AppSidebar />

                    {/* Main Content - Only this area scrolls */}
                    <main className="min-w-0 flex-1 overflow-y-auto bg-dashboard-background   ">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}