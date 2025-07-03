import { supabase } from '@/libs/supabase';
import { Product } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditProduct = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, name, price, image }: Omit<Product, "id"> & { id: string }) => {
            const { data, error } = await supabase.from("products").update({ name, price, image }).eq("id", id).select("*").single();
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

export default useEditProduct;