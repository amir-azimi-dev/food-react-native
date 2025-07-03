import { supabase } from '@/libs/supabase';
import { useQuery } from '@tanstack/react-query';

const useAdminSingleProduct = (id: number) => {
    return useQuery({
        queryKey: ["admin-product", id],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
            if (error) throw new Error(error.message);
            return data;
        }
    });
};

export default useAdminSingleProduct;