import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-sentence alien tourist review of Earth: one star overall, five
// stars for the food. Deterministic: no Date, no randomness, no
// environment-dependent behaviour. Writes only to MAKEFUN_OUTPUT_DIR.
const ENTRY =
  "One star: my translator rendered 'take me to your leader' as a marriage proposal, the waiter said yes, and my spare gut declared war on the chilli — but the rendang was worth the accidental wedding.";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `entry length ${ENTRY.length} is outside the 1-200 character limit`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line with no newline characters");
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (!ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
