import ClientLayout from "@/Layouts/ClientLayout";
import React from "react";

interface Auth {
    user: any;
}

const Welcome = ({ auth }: { auth: Auth }) => {
    return (
        <ClientLayout auth={auth} title="Bienvenue sur mon site">
            <div>
                <h1>Bienvenue sur mon site</h1>
            </div>
        </ClientLayout>
    );
};

export default Welcome;
