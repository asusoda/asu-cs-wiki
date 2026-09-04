import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Cloudflare's Rocket Loader rewrites every `<script>` in the response to a
 * non-executable `type="<token>-module"` and defers it to its own loader, which
 * cannot run ES modules. That breaks Starlight's `<site-search>` element (the
 * search dialog opens empty) along with the rest of the client-side islands.
 *
 * The `cloudflare-rocket-loader: manual` meta tag is no longer honored, so the
 * only in-repo defense is the documented per-tag opt-out: `data-cfasync="false"`.
 * Astro has no hook for adding attributes to the scripts it emits, so we stamp
 * them onto the built HTML instead.
 *
 * The real fix is turning Rocket Loader off for wiki.thesoda.io in the
 * Cloudflare dashboard (Speed > Optimization). This keeps the site working
 * until then, and if it is ever re-enabled.
 */
export default function disableRocketLoader() {
  return {
    name: "disable-rocket-loader",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = dir.pathname;
        let patched = 0;

        const walk = async (path) => {
          for (const entry of await readdir(path, { withFileTypes: true })) {
            const full = join(path, entry.name);
            if (entry.isDirectory()) {
              await walk(full);
            } else if (entry.name.endsWith(".html")) {
              const html = await readFile(full, "utf8");
              // `(?![^>]*data-cfasync)` keeps the pass idempotent.
              const next = html.replace(
                /<script(?![^>]*\sdata-cfasync=)(?=[\s>])/g,
                '<script data-cfasync="false"',
              );
              if (next !== html) {
                await writeFile(full, next);
                patched++;
              }
            }
          }
        };

        await walk(root);
        logger.info(`Marked scripts as data-cfasync="false" in ${patched} page(s).`);
      },
    },
  };
}
