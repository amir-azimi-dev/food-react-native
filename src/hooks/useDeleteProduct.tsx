import { supabase } from '@/libs/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteProduct = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            const { data, error } = await supabase.from("products").delete({ count: "exact" }).eq("id", id).select().single();
            if (error) throw new Error(error.message);
            return data;
        },

        onSuccess: (_, { id }) => {
            client.invalidateQueries({ queryKey: ["products"] });
            client.invalidateQueries({ queryKey: ["admin-product", id] });
            client.invalidateQueries({ queryKey: ["user-product", id] });
        }
    });
};

export default useDeleteProduct;