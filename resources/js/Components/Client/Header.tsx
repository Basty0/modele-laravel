import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { LogIn, UserCircle2, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

interface Config {
    site_name: string;
    site_logo: string;
}

interface PageProps extends Record<string, unknown> {
    config: Config;
}

interface HeaderProps {
    auth: {
        user: any;
    };
}

const Header = ({ auth }: HeaderProps) => {
    const { config } = usePage<PageProps>().props;

    return (
        <header className=" fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-xl font-bold flex items-center gap-2"
                        >
                            {config?.site_logo && (
                                <img
                                    src={"/" + config.site_logo}
                                    alt={config?.site_name || "Logo"}
                                    className="h-8 w-auto rounded-full"
                                />
                            )}
                            <span>{config?.site_name || "MonSite"}</span>
                        </Link>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:flex items-center gap-4">
                        {auth.user ? (
                            <Button variant="ghost" asChild>
                                <Link
                                    href={route("dashboard")}
                                    className="flex items-center gap-2"
                                >
                                    <UserCircle2 className="h-5 w-5" />
                                    <span>Tableau de bord</span>
                                </Link>
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" asChild>
                                    <Link
                                        href={route("login")}
                                        className="flex items-center gap-2"
                                    >
                                        <span>Connexion</span>
                                    </Link>
                                </Button>
                                <Button variant="default" asChild>
                                    <Link href={route("register")}>
                                        Inscription
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="flex flex-col h-full">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex-1">
                                    {/* Menu items here if needed */}
                                </div>
                                {/* Auth buttons at bottom */}
                                <div className="flex flex-col gap-2 pb-8">
                                    {auth.user ? (
                                        <Button
                                            variant="default"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link
                                                href={route("dashboard")}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <UserCircle2 className="h-5 w-5" />
                                                <span>Tableau de bord</span>
                                            </Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outline"
                                                asChild
                                                className="w-full"
                                            >
                                                <Link
                                                    href={route("login")}
                                                    className="flex items-center justify-center gap-2"
                                                >
                                                    <span>Connexion</span>
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="default"
                                                asChild
                                                className="w-full"
                                            >
                                                <Link href={route("register")}>
                                                    Inscription
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
