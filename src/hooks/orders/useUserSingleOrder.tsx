import { supabase } from '@/libs/supabase';
import { useQuery } from '@tanstack/react-query';

const useUserSingleOrder = (orderId: number, userId: string) => {
    return useQuery({
        queryKey: ["user-order", orderId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("id", orderId)
                .eq("user_id", userId)
                .single();
            if (error) throw new Error(error.message);
            return data;
        }
    });

    // return useQuery({
    //     queryKey: ["user-order-test", orderId],
    //     queryFn: async () => {
    //         const { data, error } = await supabase
    //             .from("order_items")
    //             .select("*")
    //             .eq("order_id", orderId)
    //             .single();
    //         if (error) throw new Error(error.message);
    //         return data;
    //     }
    // });
};

export default useUserSingleOrder;