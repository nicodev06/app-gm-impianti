// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const serviceRoleKey : string = Deno.env.get("SERVICE_ROLE_KEY") || "";
  const supabase = createClient("https://asmmbkocsiqdzmghrtwz.supabase.co", serviceRoleKey);

  
  const { data: { users }, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000
  })

  
  const responseData = {
    users,
    error
  }

  return new Response(
    JSON.stringify(responseData),
    { 
      headers: {...corsHeaders, "Content-Type": "application/json" }, 
      status: error ? 400 : 200
    },
  )
})

// To invoke:
 /*curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
   --header 'Content-Type: application/json' \
   --data '{"name":"Functions"}'*/
