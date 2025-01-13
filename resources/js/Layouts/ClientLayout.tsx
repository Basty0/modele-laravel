import React, { PropsWithChildren } from "react";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Client/Header";
import Footer from "@/Components/Client/Footer";

interface Props {
    title?: string;
    auth: {
        user: any;
    };
}

const ClientLayout = ({
    title = "Mon Application",
    children,
    auth,
}: PropsWithChildren<Props>) => {
    return (
        <>
            <Head title={title} />
            <div className="flex flex-col min-h-screen">
                <Header auth={auth} />
                <main className="pt-16 min-h-screen max-w-7xl mx-auto">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default ClientLayout;
