import React from "react";
import { Button } from "@/Components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import {
    Facebook,
    Twitter,
    Instagram,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";

interface Config {
    site_name: string;
    site_description: string;
    site_email: string;
    site_phone: string;
    site_address: string;
    social_facebook: string;
    social_twitter: string;
    social_instagram: string;
    footer_text: string;
}

interface PageProps extends Record<string, unknown> {
    config: Config;
}

const Footer = () => {
    const { config } = usePage<PageProps>().props;

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Section À propos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">À propos</h3>
                        <p className="text-gray-400">
                            {config?.site_description ||
                                "Votre description d'entreprise ici."}
                        </p>
                    </div>

                    {/* Section Liens rapides */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Liens rapides
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-400 hover:text-white p-0"
                                    asChild
                                >
                                    <Link href="/">Accueil</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-400 hover:text-white p-0"
                                    asChild
                                >
                                    <Link href="/services">Services</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-400 hover:text-white p-0"
                                    asChild
                                >
                                    <Link href="/about">À propos</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="text-gray-400 hover:text-white p-0"
                                    asChild
                                >
                                    <Link href="/contact">Contact</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* Section Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {config?.site_address}
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {config?.site_phone}
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {config?.site_email}
                            </li>
                        </ul>
                    </div>

                    {/* Section Réseaux sociaux */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Suivez-nous
                        </h3>
                        <div className="flex space-x-4">
                            {config?.social_facebook && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                    asChild
                                >
                                    <a
                                        href={config.social_facebook}
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                </Button>
                            )}
                            {config?.social_twitter && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                    asChild
                                >
                                    <a
                                        href={config.social_twitter}
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                </Button>
                            )}
                            {config?.social_instagram && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                    asChild
                                >
                                    <a
                                        href={config.social_instagram}
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} {config?.site_name}.{" "}
                        {config?.footer_text || "Tous droits réservés."}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
