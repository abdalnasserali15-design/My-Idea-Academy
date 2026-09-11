import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "course-media";
const LOCAL_DIR = path.resolve("course-media");

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY - check your .env and run with --env-file=.env",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function main() {
  const files = (await readdir(LOCAL_DIR)).filter((f) =>
    Object.keys(CONTENT_TYPES).includes(path.extname(f).toLowerCase()),
  );

  if (files.length === 0) {
    console.log(`No image files found in ${LOCAL_DIR}`);
    return;
  }

  console.log(`Uploading ${files.length} file(s) from ${LOCAL_DIR}...\n`);

  let succeeded = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(LOCAL_DIR, file);
    const contentType = CONTENT_TYPES[path.extname(file).toLowerCase()];
    const bytes = await readFile(filePath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, bytes, { contentType, upsert: true });

    if (error) {
      console.error(`✗ ${file}: ${error.message}`);
      failed++;
    } else {
      console.log(`✓ ${file}`);
      succeeded++;
    }
  }

  console.log(`\nDone: ${succeeded} uploaded, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

main();
