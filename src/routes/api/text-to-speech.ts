import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "node:crypto";

import { getAuthenticatedUserId } from "@/lib/verify-request-auth";

const DAILY_TTS_LIMIT = 15;
const MAX_TEXT_LENGTH = 2000;
const MODEL_ID = "eleven_multilingual_v2";

const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const CACHE_BUCKET = "tts-cache";

type TtsRequestBody = { text?: unknown; language?: unknown };

function cacheKeyFor(text: string): string {
  return (
    createHash("sha256")
      .update(`${text}::${MODEL_ID}::${VOICE_ID}`)
      .digest("hex") + ".mp3"
  );
}

export const Route = createFileRoute("/api/text-to-speech")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { text } = (await request.json()) as TtsRequestBody;
        if (typeof text !== "string" || !text.trim()) {
          return new Response("Missing text", { status: 400 });
        }
        const safeText = text.trim().slice(0, MAX_TEXT_LENGTH);
        const cacheKey = cacheKeyFor(safeText);

        const { supabaseAdmin } =
          await import("@/integrations/supabase/client.server");

        let cachedBlob: Blob | null = null;
        try {
          const cached = await supabaseAdmin.storage
            .from(CACHE_BUCKET)
            .download(cacheKey);
          cachedBlob = cached.data ?? null;
        } catch {
          cachedBlob = null;
        }
        if (cachedBlob) {
          const cachedBuffer = Buffer.from(await cachedBlob.arrayBuffer());
          return new Response(cachedBuffer, {
            headers: {
              "Content-Type": "audio/mpeg",
              "Cache-Control": "public, max-age=31536000, immutable",
              "X-TTS-Cache": "hit",
            },
          });
        }

        const userId = await getAuthenticatedUserId(request);
        if (!userId) {
          return new Response("Sign in to use text-to-speech.", {
            status: 401,
          });
        }

        const { data: withinLimit, error: usageError } =
          await supabaseAdmin.rpc("check_and_increment_tts_usage", {
            p_user_id: userId,
            p_daily_limit: DAILY_TTS_LIMIT,
          });
        if (usageError) {
          return new Response("Could not verify usage limits", { status: 500 });
        }
        if (!withinLimit) {
          return new Response(
            "Daily voice limit reached, please try again tomorrow.",
            { status: 429 },
          );
        }

        const key = process.env.ELEVENLABS_API_KEY;
        if (!key)
          return new Response("Missing ELEVENLABS_API_KEY", { status: 500 });

        try {
          const ttsRes = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "xi-api-key": key,
              },
              body: JSON.stringify({ text: safeText, model_id: MODEL_ID }),
            },
          );

          if (!ttsRes.ok) {
            console.error(
              "ElevenLabs TTS request failed",
              ttsRes.status,
              await ttsRes.text(),
            );
            return new Response(
              "Could not generate audio right now, please try again.",
              { status: 502 },
            );
          }

          const mp3Buffer = Buffer.from(await ttsRes.arrayBuffer());
          if (mp3Buffer.length === 0) {
            console.error("ElevenLabs TTS returned an empty response");
            return new Response(
              "Could not generate audio right now, please try again.",
              { status: 502 },
            );
          }

          const { error: uploadError } = await supabaseAdmin.storage
            .from(CACHE_BUCKET)
            .upload(cacheKey, mp3Buffer, {
              contentType: "audio/mpeg",
              upsert: true,
            });
          if (uploadError) {
            console.error("Failed to write TTS cache entry", uploadError);
          }

          return new Response(mp3Buffer, {
            headers: {
              "Content-Type": "audio/mpeg",
              "Cache-Control": "public, max-age=31536000, immutable",
              "X-TTS-Cache": "miss",
            },
          });
        } catch (error) {
          console.error("text-to-speech generation failed", error);
          return new Response(
            "Could not generate audio right now, please try again.",
            { status: 502 },
          );
        }
      },
    },
  },
});
