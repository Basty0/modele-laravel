import { PropsWithChildren, ReactNode } from "react";
import { User, Config } from "@/types";
import { AppSidebar } from "@/Components/AppSidebar";
import { Header } from "@/Components/Header";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { ThemeProvider } from "@/Components/theme-provider";

export default function Authenticated({
    user,
    header,
    children,
    config,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
    config: Config;
}>) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background">
                <SidebarProvider>
                    <AppSidebar config={config} />
                    <div className="flex flex-col w-full">
                        <Header user={user} />
                        <SidebarTrigger className="absolute top-4 left-4" />
                        {/* {header && (
                            <header className="bg-background border-b">
                                <div className="container mx-auto py-6">
                                    {header}
                                </div>
                            </header>
                        )} */}
                        <main className="flex-1">
                            <div className="container mx-auto pb-6 max-w-7xl">
                                {children}
                            </div>
                        </main>
                    </div>
                </SidebarProvider>
            </div>
        </ThemeProvider>
    );
}
