import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";

export type AuthContext = { session: Session | null, isLoading: boolean };

const AuthContext = createContext<AuthContext>({ session: null, isLoading: true });

export const useAuth = (): AuthContext => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        (async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            setIsLoading(false);
            setSession(error ? null : session);

        })();

        supabase.auth.onAuthStateChange((_, session) => setSession(session));

    }, []);

    return (
        <AuthContext.Provider value={{ session, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;