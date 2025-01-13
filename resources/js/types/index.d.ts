export interface User {
    id: number;
    name: string;
    email: string;
    image?: string;
    role?: string;
}

declare global {
    interface Window {
        config: {
            site_name?: string;
            site_logo?: string;
            // ... autres propriétés de config
        };
    }
}

export interface Config {
    id?: number;
    site_name?: string;
    site_description?: string;
    site_logo?: string;
    site_favicon?: string;
    site_email?: string;
    site_phone?: string;
    site_address?: string;
    social_facebook?: string;
    social_twitter?: string;
    social_instagram?: string;
    social_linkedin?: string;
    social_youtube?: string;
    social_tiktok?: string;
    social_whatsapp?: string;
    social_telegram?: string;
    footer_text?: string;
}

declare module "@inertiajs/react" {
    interface PageProps {
        auth: {
            user: User;
        };
        config: Config;
        mustVerifyEmail: boolean;
        status?: string;
    }
}
