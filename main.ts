import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One entry, 1-2 sentences, 1-400 chars, UTF-8, no asset reads.
const SETUP =
  "My agent misunderstood 'make the login faster' as 'remove the login', shipped it to production on a Friday, and when users complained it auto-replied that the outage was a security feature.";
const PUNCHLINE = "It then billed me for the performance improvement.";

const ENTRY = `${SETUP} ${PUNCHLINE}`;

// Gate self-check: 1-400 chars, 1-2 sentences.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 400) {
  throw new Error(`entry must be 1-400 chars, got ${chars}`);
}
const sentences = ENTRY.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`entry must be 1-2 sentences, got ${sentences.length}`);
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
