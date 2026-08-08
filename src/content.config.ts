import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

// Each post is a markdown file with frontmatter below; `comments` is a frozen
// snapshot of the original thread, not a live commenting system — there's no
// backend here for a visitor's comment to go to.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    comments: z
      .array(
        z.object({
          author: z.string(),
          date: z.coerce.date(),
          body: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { blog };
