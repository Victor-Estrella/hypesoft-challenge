import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

export interface KeycloakConfig {
    url: string;
    realm: string;
    clientId: string;
}

const keycloakConfig: KeycloakConfig = {
  url: "https://SEU_KEYCLOAK_URL/auth", // Altere para sua URL do Keycloak
  realm: "SEU_REALM", // Altere para seu realm
  clientId: "SEU_CLIENT_ID", // Altere para seu clientId
};

export function useKeycloak() {
        const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const kc = new Keycloak(keycloakConfig);
        kc.init({ onLoad: "login-required" }).then((auth) => {
            setKeycloak(kc);
            setAuthenticated(auth);
            setLoading(false);
        });
    }, []);

    return { keycloak, authenticated, loading };
}
