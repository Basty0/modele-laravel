import { User } from "@/types";
import { useForm } from "@inertiajs/react";
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
    onSuccess: () => void;
}

export function CreateUserForm({ onSuccess }: Props) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "user",
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, String(value));
            }
        });

        post(route("users.store"), {
            data: formData,
            onSuccess: () => {
                reset();
                onSuccess();
                toast({
                    title: "Succès",
                    description: "Utilisateur créé avec succès",
                });
            },
            forceFormData: true,
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
                <label htmlFor="password">Mot de passe</label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                {errors.password && (
                    <div className="text-red-500">{errors.password}</div>
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
                    Créer
                </Button>
            </div>
        </form>
    );
}
