import { Config, User } from "@/types";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useRef } from "react";

interface Props {
    auth: {
        user: User;
    };
    config: Config;
}

export default function EditConfig({ auth, config: initialConfig }: Props) {
    const { toast } = useToast();
    const logoRef = useRef<HTMLInputElement>(null);
    const faviconRef = useRef<HTMLInputElement>(null);

    const { data, setData, patch, processing, errors, progress } = useForm({
        site_name: initialConfig?.site_name || "",
        site_description: initialConfig?.site_description || "",
        site_logo: null as File | null,
        site_favicon: null as File | null,
        site_email: initialConfig?.site_email || "",
        site_phone: initialConfig?.site_phone || "",
        site_address: initialConfig?.site_address || "",
        social_facebook: initialConfig?.social_facebook || "",
        social_twitter: initialConfig?.social_twitter || "",
        social_instagram: initialConfig?.social_instagram || "",
        social_linkedin: initialConfig?.social_linkedin || "",
        social_youtube: initialConfig?.social_youtube || "",
        social_tiktok: initialConfig?.social_tiktok || "",
        social_whatsapp: initialConfig?.social_whatsapp || "",
        social_telegram: initialConfig?.social_telegram || "",
        footer_text: initialConfig?.footer_text || "",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== "site_logo" && key !== "site_favicon") {
                formData.append(key, String(value || ""));
            }
        });

        if (logoRef.current?.files?.[0]) {
            formData.append("site_logo", logoRef.current.files[0]);
        }
        if (faviconRef.current?.files?.[0]) {
            formData.append("site_favicon", faviconRef.current.files[0]);
        }

        formData.append("_method", "PATCH");

        router.post(route("config.update"), formData, {
            onSuccess: () => {
                toast({
                    title: "Succès",
                    description: "Configuration mise à jour avec succès",
                });
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            config={initialConfig}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Configuration du site
                </h2>
            }
        >
            <Head title="Configuration du site" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Informations générales
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="site_name">
                                            Nom du site
                                        </label>
                                        <Input
                                            id="site_name"
                                            value={data.site_name}
                                            onChange={(e) =>
                                                setData(
                                                    "site_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.site_name && (
                                            <div className="text-red-500">
                                                {errors.site_name}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="site_logo">
                                            Logo du site
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {initialConfig?.site_logo && (
                                                <img
                                                    src={`/${initialConfig.site_logo}`}
                                                    alt="Logo actuel"
                                                    className="h-12 w-auto object-contain"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display =
                                                            "none";
                                                    }}
                                                />
                                            )}
                                            <Input
                                                ref={logoRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setData(
                                                        "site_logo",
                                                        e.target.files?.[0] ||
                                                            null
                                                    )
                                                }
                                            />
                                        </div>
                                        {errors.site_logo && (
                                            <div className="text-red-500">
                                                {errors.site_logo}
                                            </div>
                                        )}
                                        {progress && (
                                            <progress
                                                value={progress.percentage}
                                                max="100"
                                            >
                                                {progress.percentage}%
                                            </progress>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="site_description">
                                        Description du site
                                    </label>
                                    <Textarea
                                        id="site_description"
                                        value={data.site_description}
                                        onChange={(e) =>
                                            setData(
                                                "site_description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.site_description && (
                                        <div className="text-red-500">
                                            {errors.site_description}
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="site_favicon">
                                            Favicon du site
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {initialConfig?.site_favicon && (
                                                <img
                                                    src={`${initialConfig.site_favicon}`}
                                                    alt="Favicon actuel"
                                                    className="h-8 w-auto"
                                                />
                                            )}
                                            <Input
                                                ref={faviconRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setData(
                                                        "site_favicon",
                                                        e.target.files?.[0] ||
                                                            null
                                                    )
                                                }
                                            />
                                        </div>
                                        {errors.site_favicon && (
                                            <div className="text-red-500">
                                                {errors.site_favicon}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="site_email">
                                            Email
                                        </label>
                                        <Input
                                            id="site_email"
                                            type="email"
                                            value={data.site_email}
                                            onChange={(e) =>
                                                setData(
                                                    "site_email",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.site_email && (
                                            <div className="text-red-500">
                                                {errors.site_email}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="site_phone">
                                            Téléphone
                                        </label>
                                        <Input
                                            id="site_phone"
                                            value={data.site_phone}
                                            onChange={(e) =>
                                                setData(
                                                    "site_phone",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="site_address">
                                        Adresse
                                    </label>
                                    <Textarea
                                        id="site_address"
                                        value={data.site_address}
                                        onChange={(e) =>
                                            setData(
                                                "site_address",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Réseaux sociaux
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="social_facebook">
                                            Facebook
                                        </label>
                                        <Input
                                            id="social_facebook"
                                            value={data.social_facebook}
                                            onChange={(e) =>
                                                setData(
                                                    "social_facebook",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_twitter">
                                            Twitter
                                        </label>
                                        <Input
                                            id="social_twitter"
                                            value={data.social_twitter}
                                            onChange={(e) =>
                                                setData(
                                                    "social_twitter",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_instagram">
                                            Instagram
                                        </label>
                                        <Input
                                            id="social_instagram"
                                            value={data.social_instagram}
                                            onChange={(e) =>
                                                setData(
                                                    "social_instagram",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_linkedin">
                                            LinkedIn
                                        </label>
                                        <Input
                                            id="social_linkedin"
                                            value={data.social_linkedin}
                                            onChange={(e) =>
                                                setData(
                                                    "social_linkedin",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_youtube">
                                            YouTube
                                        </label>
                                        <Input
                                            id="social_youtube"
                                            value={data.social_youtube}
                                            onChange={(e) =>
                                                setData(
                                                    "social_youtube",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_tiktok">
                                            TikTok
                                        </label>
                                        <Input
                                            id="social_tiktok"
                                            value={data.social_tiktok}
                                            onChange={(e) =>
                                                setData(
                                                    "social_tiktok",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_whatsapp">
                                            WhatsApp
                                        </label>
                                        <Input
                                            id="social_whatsapp"
                                            value={data.social_whatsapp}
                                            onChange={(e) =>
                                                setData(
                                                    "social_whatsapp",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="social_telegram">
                                            Telegram
                                        </label>
                                        <Input
                                            id="social_telegram"
                                            value={data.social_telegram}
                                            onChange={(e) =>
                                                setData(
                                                    "social_telegram",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Pied de page
                                </h3>
                                <div>
                                    <label htmlFor="footer_text">
                                        Texte du pied de page
                                    </label>
                                    <Textarea
                                        id="footer_text"
                                        value={data.footer_text}
                                        onChange={(e) =>
                                            setData(
                                                "footer_text",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    Enregistrer
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
