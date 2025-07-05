import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";

function useAdminOrdersChannel() {
    const client = useQueryClient();

    useEffect(() => {
        const channel = supabase
            .channel("custom-insert-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "orders" },
                () => {
                    client.invalidateQueries({ queryKey: ["admin-active-orders"] });
                    client.invalidateQueries({ queryKey: ["admin-archived-orders"] });
                }
            )
            .subscribe();

        return () => { channel.unsubscribe() }

    }, []);

    return null;
};

export default useAdminOrdersChannel;