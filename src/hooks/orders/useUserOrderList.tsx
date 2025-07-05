import { supabase } from '@/libs/supabase';
import { useQuery } from '@tanstack/react-query';

const useUserOrderList = (userId: string) => {
    return useQuery({
        queryKey: ["user-orders"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false })
                .eq("user_id", userId);

            if (error) throw new Error(error.message);
            return data;
        }
    });
};

export default useUserOrderList;