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
        {
          tag: 'script',
          attrs: {
            src: '/sidebar-current.js',
            defer: true,
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
      sidebar: [
        { label: "ASU CS Wiki", link: "/" },
        {
          label: "Courses",
          collapsed: false,
          items: [
            { label: "Course Browser", link: "/guides/courses/" },
            { label: "CSE 110", link: "/courses/cse-110/" },
            { label: "CSE 205", link: "/courses/cse-205/" },
            { label: "CSE 240", link: "/courses/cse-240/" },
            { label: "CSE 259", link: "/courses/cse-259/" },
            { label: "CSE 310", link: "/courses/cse-310/" },
            { label: "CSE 330", link: "/courses/cse-330/" },
            { label: "CSE 340", link: "/courses/cse-340/" },
            { label: "CSE 355", link: "/courses/cse-355/" },
            { label: "CSE 360", link: "/courses/cse-360/" },
            { label: "CSE 365", link: "/courses/cse-365/" },
            { label: "MAT 267", link: "/courses/mat-267/" },
            { label: "MAT 343", link: "/courses/mat-343/" },
          ],
        },
        {
          label: "Guides",
          collapsed: false,
          items: [
            { label: "All Guides", link: "/guides/" },
            {
              label: "Academics & Campus",
              collapsed: false,
              items: [
                { label: "Research", link: "/guides/research/" },
                { label: "Campus Resources", link: "/guides/campus-resources/" },
                { label: "Supercomputer Usage", link: "/guides/supercomputer-usage/" },
              ],
            },
            {
              label: "Career Prep",
              collapsed: false,
              items: [
                { label: "Internships", link: "/guides/internships/" },
                { label: "Resume and Career Prep", link: "/guides/resume-and-career-prep/" },
                { label: "Interview Prep", link: "/guides/interview-prep/" },
              ],
            },
            {
              label: "Community & Events",
              collapsed: false,
              items: [
                { label: "Student Organizations", link: "/guides/clubs/" },
                { label: "What SoDA Is", link: "/guides/soda-guide/" },
                { label: "Hackathons", link: "/guides/hackathons/" },
                { label: "Workshop Notes", link: "/guides/workshop-notes/" },
              ],
            },
            {
              label: "Technical Skills",
              collapsed: false,
              items: [
                { label: "Git and GitHub", link: "/guides/git-and-github/" },
                { label: "AI and LLM Projects", link: "/guides/ai-and-llm-projects/" },
                { label: "Maximizing Free AI as ASU Student", link: "/guides/maximizing-free-ai-as-asu-student/" },
                { label: "Functional Programming", link: "/guides/functional-programming/" },
              ],
            },
          ],
        },
      ],
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
