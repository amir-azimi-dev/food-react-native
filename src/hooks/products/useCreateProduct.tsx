import { supabase } from '@/libs/supabase';
import { Product } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateProduct = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, price, image }: Omit<Product, "id">) => {
            const { data, error } = await supabase.from("products").insert({ name, price, image }).select().single();
            if (error) throw new Error(error.message);
            return data;
        },

        onSuccess: () => client.invalidateQueries({ queryKey: ["products"] })
    });
};

export default useCreateProduct;