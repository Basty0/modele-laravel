import { useRef, useState, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <CardHeader className="px-0">
                <CardTitle>Supprimer le compte</CardTitle>
                <CardDescription>
                    Une fois votre compte supprimé, toutes ses ressources et
                    données seront définitivement supprimées. Avant de supprimer
                    votre compte, veuillez télécharger les données ou
                    informations que vous souhaitez conserver.
                </CardDescription>
            </CardHeader>

            <Button variant="destructive" onClick={confirmUserDeletion}>
                Supprimer le compte
            </Button>

            <Dialog
                open={confirmingUserDeletion}
                onOpenChange={setConfirmingUserDeletion}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Êtes-vous sûr de vouloir supprimer votre compte ?
                        </DialogTitle>
                        <DialogDescription>
                            Une fois votre compte supprimé, toutes ses
                            ressources et données seront définitivement
                            supprimées. Veuillez entrer votre mot de passe pour
                            confirmer que vous souhaitez supprimer
                            définitivement votre compte.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={deleteUser} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="sr-only">
                                Mot de passe
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Mot de passe"
                                autoFocus
                            />

                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={closeModal}>
                                Annuler
                            </Button>
                            <Button variant="destructive" disabled={processing}>
                                Supprimer le compte
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
