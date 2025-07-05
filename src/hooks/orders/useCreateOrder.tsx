import { supabase } from '@/libs/supabase';
import { InsertTable } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateOrder = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async ({ user_id, status, total }: InsertTable<"orders">) => {
            const { data, error } = await supabase.from("orders").insert({ user_id, status, total }).select().single();

            if (error) throw new Error(error.message);
            return data;
        },

        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["admin-active-orders"] });
            client.invalidateQueries({ queryKey: ["admin-archived-orders"] });
            client.invalidateQueries({ queryKey: ["user-orders"] });
        }
    });
};

const useCreateOrderItems = () => {

    return useMutation({
        mutationFn: async (orderItems: InsertTable<"order_items">[]) => {
            const { data, error } = await supabase.from("order_items").insert(orderItems).select();

            if (error) throw new Error(error.message);
            return data;
        }
    });
};

export { useCreateOrderItems };
export default useCreateOrder;