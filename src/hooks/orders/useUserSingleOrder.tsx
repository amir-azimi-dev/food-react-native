import { supabase } from '@/libs/supabase';
import { useQuery } from '@tanstack/react-query';

const useUserSingleOrder = (orderId: number, userId: string) => {
    return useQuery({
        queryKey: ["user-order", orderId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("*, order_items(*, products (*) )")
                .eq("id", orderId)
                .eq("user_id", userId)
                .single();
            if (error) throw new Error(error.message);
            return data;
        }
    });
};

export default useUserSingleOrder;