import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new (await import('https://esm.sh/stripe@14.21.0')).default(
  Deno.env.get('STRIPE_SECRET_KEY') || '',
  {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  }
)

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')
  const body = await request.text()
  
  let receivedEvent
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      cryptoProvider
    )
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  switch (receivedEvent.type) {
    case 'checkout.session.completed': {
      const session = receivedEvent.data.object
      const userId = session.metadata?.userId

      if (userId) {
        // Update user's subscription status in your database
        await supabase
          .from('profiles')
          .update({ 
            subscription_status: 'active',
            subscription_id: session.subscription,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId)
      }
      break
    }
    
    case 'customer.subscription.deleted': {
      const subscription = receivedEvent.data.object
      
      // Find user by subscription ID and update status
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('subscription_id', subscription.id)
        .single()

      if (profile) {
        await supabase
          .from('profiles')
          .update({ 
            subscription_status: 'canceled',
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id)
      }
      break
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})