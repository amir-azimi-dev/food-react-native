import { supabase } from '@/libs/supabase';
import { useQuery } from '@tanstack/react-query';

const useProductList = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (error) throw new Error(error.message);
            return data;
        }
    });
};

export default useProductList;