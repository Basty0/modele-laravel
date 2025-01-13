import { useRef, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <CardHeader className="px-0">
                <CardTitle>Modifier le mot de passe</CardTitle>
                <CardDescription>
                    Assurez-vous d'utiliser un mot de passe long et aléatoire
                    pour sécuriser votre compte.
                </CardDescription>
            </CardHeader>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="current_password">
                        Mot de passe actuel
                    </Label>
                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        autoComplete="current-password"
                    />
                    {errors.current_password && (
                        <p className="text-sm text-destructive">
                            {errors.current_password}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Nouveau mot de passe</Label>
                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">
                        Confirmer le mot de passe
                    </Label>
                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && (
                        <p className="text-sm text-destructive">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

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
