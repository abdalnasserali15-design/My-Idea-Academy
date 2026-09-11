import { createFileRoute } from "@tanstack/react-router";

import { getAuthenticatedUserId } from "@/lib/verify-request-auth";

export const Route = createFileRoute("/api/delete-account")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await getAuthenticatedUserId(request);
        if (!userId) {
          return new Response("Sign in required.", { status: 401 });
        }

        const { supabaseAdmin } =
          await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
        if (error) {
          console.error("Account deletion failed", error);
          return new Response(
            "Could not delete your account right now, please try again.",
            { status: 500 },
          );
        }

        return new Response(null, { status: 204 });
      },
    },
  },
});
