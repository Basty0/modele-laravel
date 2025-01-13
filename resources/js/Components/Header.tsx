import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { DoorOpen, LogOut, UserCircle } from "lucide-react";
import { ModeToggle } from "@/Components/mode-toggle";

interface HeaderProps {
    user: User;
}

export function Header({ user }: HeaderProps) {
    return (
        <header className="">
            <div className="flex h-16 items-center px-4 gap-4 justify-end">
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-8 w-8 rounded-full"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback>
                                    {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                                {user.name && (
                                    <p className="font-medium">{user.name}</p>
                                )}
                                {user.email && (
                                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("profile.edit")}
                                className="w-full cursor-pointer"
                            >
                                <UserCircle className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full cursor-pointer"
                            >
                                <DoorOpen className="mr-2 h-4 w-4" />
                                Déconnexion
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
