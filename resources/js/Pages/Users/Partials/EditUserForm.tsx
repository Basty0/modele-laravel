import { User } from "@/types";
import { useForm, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Props {
    user: User;
    onSuccess: () => void;
}

export function EditUserForm({ user, onSuccess }: Props) {
    const { toast } = useToast();
    const { data, setData, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role || "user",
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("role", data.role);

        if (data.image) {
            formData.append("image", data.image);
        }

        router.post(route("users.update", user.id), formData, {
            onSuccess: () => {
                onSuccess();
                toast({
                    title: "Succès",
                    description: "Utilisateur mis à jour avec succès",
                });
            },
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name">Nom</label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && (
                    <div className="text-red-500">{errors.name}</div>
                )}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && (
                    <div className="text-red-500">{errors.email}</div>
                )}
            </div>

            <div>
                <label htmlFor="role">Rôle</label>
                <Select
                    value={data.role}
                    onValueChange={(value) => setData("role", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="user">Utilisateur</SelectItem>
                    </SelectContent>
                </Select>
                {errors.role && (
                    <div className="text-red-500">{errors.role}</div>
                )}
            </div>

            <div>
                <label htmlFor="image">Image</label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setData("image", e.target.files?.[0] || null)
                    }
                />
                {errors.image && (
                    <div className="text-red-500">{errors.image}</div>
                )}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    Mettre à jour
                </Button>
            </div>
        </form>
    );
}
