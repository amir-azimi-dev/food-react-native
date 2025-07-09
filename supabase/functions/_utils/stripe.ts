// esm.sh is used to compile stripe-node to be compatible with ES modules.
// @ts-ignore
import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno&deno-std=0.132.0&no-check';

// @ts-ignore
export const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    httpClient: Stripe.createFetchHttpClient(),
});