import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = "In my defense, the sock was auditioning to become lint.";

function assertValidLine(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(outputDir, text) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidLine(line);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", line);
