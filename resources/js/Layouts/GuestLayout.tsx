import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { Button } from "@/Components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";

interface Config {
    site_name: string;
    site_description: string;
    site_logo: string;
    social_facebook: string;
    social_twitter: string;
    social_instagram: string;
}

interface PageProps extends Record<string, unknown> {
    config: Config;
}

export default function Guest({ children }: PropsWithChildren) {
    const { config } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen flex flex-row items-center bg-white">
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <div>
                    <Link href="/">
                        {config?.site_logo ? (
                            <img
                                src={"/" + config.site_logo}
                                alt={config?.site_name || "Logo"}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        )}
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4">
                    {children}
                </div>
            </div>
            <div className="w-1/2 h-screen md:block hidden relative">
                <img
                    src="/images/guest-image2.jpeg"
                    alt="Description"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        {config?.site_name}
                    </h2>
                    <p className="text-lg mb-8 max-w-lg">
                        {config?.site_description}
                    </p>
                    <div className="flex gap-4">
                        {config?.social_facebook && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:text-white/80"
                                asChild
                            >
                                <a
                                    href={config.social_facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                        {config?.social_twitter && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:text-white/80"
                                asChild
                            >
                                <a
                                    href={config.social_twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                        {config?.social_instagram && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:text-white/80"
                                asChild
                            >
                                <a
                                    href={config.social_instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
