import { supabase } from '@/libs/supabase';
import { useQuery } from '@tanstack/react-query';

const useAdminOrderList = (isPending: boolean) => {
    const query = isPending ? (
        useQuery({
            queryKey: ["admin-active-orders"],
            queryFn: async () => {
                const { data, error } = await supabase.from("orders").select("*").neq("status", "Delivered");
                if (error) throw new Error(error.message);
                return data;
            }
        })
    ) : (
        useQuery({
            queryKey: ["admin-archived-orders"],
            queryFn: async () => {
                const { data, error } = await supabase.from("orders").select("*").eq("status", "Delivered");
                if (error) throw new Error(error.message);
                return data;
            }
        })
    );


    return query;
};

export default useAdminOrderList;