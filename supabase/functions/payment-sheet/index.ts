// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { stripe } from "../_utils/stripe.ts";
import { createOrRetrieveProfile } from "../_utils/supabase.ts";

// @ts-ignore
Deno.serve(async (req: Request) => {
  try {
    const { amount } = await req.json();
    const stripeCustomerId = await createOrRetrieveProfile(req);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: stripeCustomerId },
      { apiVersion: "2020-08-27" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: stripeCustomerId
    });

    const data = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey: Deno.env.get("EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
      customer: stripeCustomerId,
      ephemeralKey: ephemeralKey.secret
    };

    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
    );

  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({ error }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500
      },
    );
  }
});

// curl -i --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU0MzIxL2F1dGgvdjEiLCJzdWIiOiI4OTIzYzgyYy1hNWQzLTRiNTktOTE5OC1jZDAyYjQ2MTA3ZjMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzUyMTU0NTUxLCJpYXQiOjE3NTIxNTA5NTEsImVtYWlsIjoiYXp5bXkxMzgxQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJhenlteTEzODFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiODkyM2M4MmMtYTVkMy00YjU5LTkxOTgtY2QwMmI0NjEwN2YzIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NTE5NzQ4Mzh9XSwic2Vzc2lvbl9pZCI6ImM5MDlkMzE3LTNkNzYtNDdmOS04ZmMwLTY3Mjc5ZTE0OWU1NSIsImlzX2Fub255bW91cyI6ZmFsc2V9.eeiD8AqKPk0iWTphChQP4DGalA-RhEd0bWSo28WLDeU' --header 'Content-Type: application/json' --data '{"amount": 100}'

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"amount": 100}'

*/