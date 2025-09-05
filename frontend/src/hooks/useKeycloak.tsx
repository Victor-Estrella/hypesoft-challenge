import { useEffect, useRef, useState } from "react";
import Keycloak from "keycloak-js";

const initOptions = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
};

// Instância global, criada uma única vez
let client: Keycloak.KeycloakInstance | null = null;
let clientInitialized = false;

if (typeof window !== "undefined" && !client) {
    client = new Keycloak(initOptions);
}

const useKeycloak = () => {
    const [isLogin, setLogin] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {
        if (!client || clientInitialized) return;
        clientInitialized = true;
        client.init({
            onLoad: "login-required",
            checkLoginIframe: true,
        }).then((auth) => {
            setLogin(auth);
            setToken(client?.token ?? null);
            // Pega roles do token
            if (client?.tokenParsed && client.tokenParsed.realm_access) {
                setRoles(client.tokenParsed.realm_access.roles || []);
            } else {
                setRoles([]);
            }
        }, () => {
            setLogin(false);
            setToken(null);
            setRoles([]);
            console.error("Authentication Failed");
        });
    }, []);

    const login = () => client?.login();
    const logout = (redirectUri?: string) => client?.logout({ redirectUri });

    return { isLogin, token, roles, login, logout };
};

export default useKeycloak;