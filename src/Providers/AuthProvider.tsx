import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";

type UserRole = "USER" | "ADMIN" | null;
export type AuthContext = { session: Session | null, isLoading: boolean, userRole: UserRole };

const AuthContext = createContext<AuthContext>({ session: null, isLoading: true, userRole: null });

export const useAuth = (): AuthContext => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        (async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            setSession(error ? null : session);

            if (!session) return;


            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single();

            data?.role && setUserRole(data.role as UserRole);
            setIsLoading(false);
        })();

        supabase.auth.onAuthStateChange((_, session) => setSession(session));

    }, []);

    return (
        <AuthContext.Provider value={{ session, isLoading, userRole }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;