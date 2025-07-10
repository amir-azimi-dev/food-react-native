import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stripe } from "./stripe.ts";

export const createOrRetrieveProfile = async (req: Request) => {
    const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        {
            global: {
                headers: { Authorization: req.headers.get("Authorization")! },
            },
        }
    );

    const {
        data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) throw new Error("No user found");

    const { data: userData, error } = await supabaseClient.from("profiles").select("*").eq("id", user.id).single();
    if (!userData || error) throw new Error("Profile not found!");

    if (userData.stripe_customer_id) return userData.stripe_customer_id;

    const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
            userId: user.id
        }
    });

    const { error: updateError } = await supabaseClient.from("profiles").update({ stripe_customer_id: customer.id }).eq("id", user.id);
    if (updateError) throw new Error(updateError.message);
    return customer.id;
};