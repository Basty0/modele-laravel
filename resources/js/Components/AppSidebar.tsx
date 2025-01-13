import { Home, Settings, LayoutDashboard, Sliders, Users } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Config } from "@/types";

interface AppSidebarProps {
    config: Config;
}

export function AppSidebar({ config }: AppSidebarProps) {
    const { url } = usePage();

    return (
        <Sidebar>
            <SidebarHeader className=" p-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        {config?.site_logo && (
                            <img
                                src={config.site_logo}
                                alt={config?.site_name || "Logo"}
                                className="h-8 w-auto"
                            />
                        )}
                        <span className="font-semibold text-lg">
                            {config?.site_name || "Dashboard"}
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-2">
                <div className="space-y-2">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                            Menu Principal
                        </h2>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={route("dashboard")}
                                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                            ${
                                                url === "/dashboard"
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                            }`}
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={route("profile.edit")}
                                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                            ${
                                                url === "/profile"
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                            }`}
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>Paramètres</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={route("config.edit")}
                                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                            ${
                                                url === "/config"
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                            }`}
                                    >
                                        <Sliders className="h-4 w-4" />
                                        <span>Configuration</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={route("users.index")}
                                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                            ${
                                                url === "/users"
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                            }`}
                                    >
                                        <Users className="h-4 w-4" />
                                        <span>Utilisateurs</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
