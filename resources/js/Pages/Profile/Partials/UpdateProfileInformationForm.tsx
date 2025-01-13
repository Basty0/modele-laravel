import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Alert, AlertDescription } from "@/Components/ui/alert";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<{ auth: { user: User } }>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <CardHeader className="px-0">
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                    Mettez à jour les informations de votre profil et votre
                    adresse e-mail.
                </CardDescription>
            </CardHeader>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email}
                        </p>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Alert>
                        <AlertDescription>
                            Votre adresse e-mail n'est pas vérifiée.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="font-medium underline underline-offset-4 hover:text-primary"
                            >
                                Cliquez ici pour renvoyer l'e-mail de
                                vérification.
                            </Link>
                        </AlertDescription>
                    </Alert>
                )}

                {status === "verification-link-sent" && (
                    <Alert>
                        <AlertDescription className="text-green-600">
                            Un nouveau lien de vérification a été envoyé à votre
                            adresse e-mail.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Enregistrer</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-muted-foreground">
                            Enregistré.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
