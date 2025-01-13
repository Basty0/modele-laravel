import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Alert, AlertDescription } from "@/Components/ui/alert";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="mb-4 text-sm text-gray-600">
                Mot de passe oublié ? Pas de problème. Indiquez-nous simplement
                votre adresse e-mail et nous vous enverrons un lien de
                réinitialisation qui vous permettra d'en choisir un nouveau.
            </div>

            {status && (
                <Alert variant="default" className="mb-4">
                    <AlertDescription>{status}</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoFocus
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button type="submit" disabled={processing}>
                        Envoyer le lien de réinitialisation
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
