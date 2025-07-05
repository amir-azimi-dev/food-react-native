import { supabase } from '@/libs/supabase';
import { InsertTable, OrderStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditOrderStatus = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: number, status: OrderStatus }) => {
            const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select("*").single();
            if (error) throw new Error(error.message);
            return data;
        },

        onSuccess: (_, { id }) => {
            client.invalidateQueries({ queryKey: ["admin-active-orders"] });
            client.invalidateQueries({ queryKey: ["admin-archived-orders"] });
            client.invalidateQueries({ queryKey: ["user-orders"] });
            client.invalidateQueries({ queryKey: ["admin-order", id] });
            client.invalidateQueries({ queryKey: ["user-order", id] });
        }
    });
};

export default useEditOrderStatus;