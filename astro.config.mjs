// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import mermaid from "astro-mermaid";
// https://astro.build/config
export default defineConfig({
  site: "https://wiki.thesoda.io",

  image: {
    service: passthroughImageService(),
  },

  integrations: [
    starlight({
      title: "ASU CS Wiki",
      pagefind: true,
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'cloudflare-rocket-loader',
            content: 'manual',
          },
        },
      ],
      customCss: [
        "@fontsource-variable/space-grotesk",
        "./src/styles/custom.css",
        "./src/styles/global.css",
      ],
      components: {
        Header: './src/components/Header.astro',
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/asusoda/asu-cs-wiki",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/g6Nu8Fj4G6",
        },
        {
          icon: "instagram",
          label: "Instagram",
          href: "https://www.instagram.com/soda.asu/",
        },
        {
          icon: "linkedin",
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/thesoda/",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/asusoda/asu-cs-wiki/edit/main",
      },
    }),
    mermaid(
      {
        theme: "forest"
      }
    ),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
