import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-sentence alien tourist review of Earth: one star overall, five
// stars for the food. Deterministic: no Date, no randomness, no
// environment-dependent behaviour. Writes only to MAKEFUN_OUTPUT_DIR.
const ENTRY =
  "One star: my translator rendered 'take me to your leader' as a marriage proposal, the waiter said yes, and my spare gut declared war on the chilli — but the rendang was worth the accidental wedding.";

function validate(entry: string): void {
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(
      `entry length ${entry.length} is outside the 1-200 character limit`,
    );
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line with no newline characters");
  }
  if (entry.trim() !== entry) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (!entry.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
