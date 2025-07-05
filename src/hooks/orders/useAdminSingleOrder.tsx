import { supabase } from '@/libs/supabase';
import { useQuery } from '@tanstack/react-query';

const useAdminSingleOrder = (orderId: number) => {
    return useQuery({
        queryKey: ["admin-order", orderId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("*, order_items(*, products (*) )")
                .eq("id", orderId)
                .single();
            if (error) throw new Error(error.message);
            return data;
        }
    });
};

export default useAdminSingleOrder;