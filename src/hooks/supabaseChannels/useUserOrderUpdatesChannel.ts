import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";

function useUserOrderUpdatesChannel(ids: number[]) {
    const client = useQueryClient();

    useEffect(() => {
        const channels = ids.map(id => (
            supabase
                .channel(`custom-filter-channel-${id}`)
                .on(
                    "postgres_changes",
                    { event: "UPDATE", schema: "public", table: "orders", filter: `id=eq.${id}` },
                    () => {
                        client.invalidateQueries({ queryKey: ["user-orders"] });
                        client.invalidateQueries({ queryKey: ["user-order", id] });
                    }
                )
                .subscribe()
        ))

        return () => channels.forEach(channel => channel.unsubscribe());

    }, [JSON.stringify([...ids].sort())]);

    return null;
};

export default useUserOrderUpdatesChannel;