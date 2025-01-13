import { Config, User } from "@/types";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { CreateUserForm } from "./Partials/CreateUserForm";
import { EditUserForm } from "./Partials/EditUserForm";

interface Props {
    auth: {
        user: User;
    };
    users: User[];
    config: Config;
}

export default function Users({ auth, users, config }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsEditOpen(true);
    };

    const handleDelete = (user: User) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            router.delete(route("users.destroy", user.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            config={config}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Gestion des utilisateurs
                </h2>
            }
        >
            <Head title="Utilisateurs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium">
                                Utilisateurs
                            </h3>
                            <Dialog
                                open={isCreateOpen}
                                onOpenChange={setIsCreateOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button>
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Ajouter un utilisateur
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Nouvel utilisateur
                                        </DialogTitle>
                                    </DialogHeader>
                                    <CreateUserForm
                                        onSuccess={() => setIsCreateOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Modifier l'utilisateur
                                    </DialogTitle>
                                </DialogHeader>
                                {editingUser && (
                                    <EditUserForm
                                        user={editingUser}
                                        onSuccess={() => {
                                            setIsEditOpen(false);
                                            setEditingUser(null);
                                        }}
                                    />
                                )}
                            </DialogContent>
                        </Dialog>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Rôle</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <img
                                                src={`/${user.image}`}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.role === "admin"
                                                ? "Administrateur"
                                                : "Utilisateur"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleDelete(user)
                                                    }
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
