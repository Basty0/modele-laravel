import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, usePage } from "@inertiajs/react";
import { Card, CardContent } from "@/Components/ui/card";

interface User {
    id: number;
    name: string;
    email: string;
    image?: string;
}

interface Config {
    site_name?: string;
    site_logo?: string;
    site_description?: string;
}

interface Props {
    auth: {
        user: User;
    };
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ auth, mustVerifyEmail, status }: Props) {
    const { config } = usePage<{ config: Config }>().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }
            config={config}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="p-4 sm:p-8">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4 sm:p-8">
                                <UpdatePasswordForm className="max-w-xl" />
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardContent className="p-4 sm:p-8">
                                <DeleteUserForm className="max-w-xl" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
