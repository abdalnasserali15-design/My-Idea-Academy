import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createGeminiProvider } from "@/lib/ai-gateway.server";
import { getAuthenticatedUserId } from "@/lib/verify-request-auth";
import { TOPICS } from "@/data/topics";
import en from "@/i18n/locales/en";

type ChatRequestBody = { messages?: unknown; topicSlug?: string };

type TopicI18nKey =
  | "cybersecurity"
  | "ai"
  | "software"
  | "networking"
  | "hacking"
  | "data"
  | "cloud"
  | "os"
  | "skills";

const DAILY_MESSAGE_LIMIT = 50;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await getAuthenticatedUserId(request);
        if (!userId) {
          return new Response("Sign in to use the AI tutor.", { status: 401 });
        }

        const { supabaseAdmin } =
          await import("@/integrations/supabase/client.server");
        const { data: withinLimit, error: usageError } =
          await supabaseAdmin.rpc("check_and_increment_chat_usage", {
            p_user_id: userId,
            p_daily_limit: DAILY_MESSAGE_LIMIT,
          });
        if (usageError) {
          return new Response("Could not verify usage limits", { status: 500 });
        }
        if (!withinLimit) {
          return new Response(
            "Daily message limit reached, please try again tomorrow.",
            { status: 429 },
          );
        }

        const { messages, topicSlug } =
          (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.GEMINI_API_KEY;
        if (!key)
          return new Response("Missing GEMINI_API_KEY", { status: 500 });

        const google = createGeminiProvider(key);
        const model = google("gemini-3.5-flash");

        const topic = TOPICS.find((t) => t.slug === topicSlug);
        const topicTitle = topic
          ? en.topics[topic.i18nKey as TopicI18nKey]?.title
          : undefined;

        const system = topicTitle
          ? `You are IdeaMentor, a concise and friendly tutor for the topic "${topicTitle}" on the My Idea Academy platform. Answer clearly in the user's language. Keep answers short (2-4 sentences) unless the user asks for depth. If a question is off-topic, gently steer back to ${topicTitle}.`
          : "You are IdeaMentor, a concise and friendly tutor on the My Idea Academy platform. Answer clearly in the user's language. Keep answers short (2-4 sentences).";

        const result = streamText({
          model,
          system,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
