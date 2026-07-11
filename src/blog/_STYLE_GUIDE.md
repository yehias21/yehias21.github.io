# Blog Style Guide & Template

> This file is **not** rendered on the site (it isn't imported in `content.ts`).
> It documents the writing conventions the blog follows, modeled on
> [Lilian Weng's Lil'Log](https://lilianweng.github.io/), and doubles as a
> copy-paste template for a new post.

## How to add a post

1. Copy the template below into `src/blog/<slug>.md`.
2. Import it in `src/data/content.ts`:
   ```ts
   import myPostMd from '../blog/<slug>.md?raw';
   ```
3. Add an entry to `BLOG_POSTS` (newest first):
   ```ts
   {
     id: "<slug>",            // must match the file name & the URL /blog/<slug>
     title: "…",
     date: "Jul 10, 2026",
     updated: "Aug 2, 2026",  // optional; renders "· Updated on …"
     readTime: "12 min read",
     excerpt: "One or two sentences shown on the /blog list and as the sub-title.",
     content: myPostMd,
     tags: ["Topic", "Topic"]
   }
   ```
   Images go in `public/blog/` and are referenced with **absolute** paths
   (`/blog/foo.png`), never `./blog/...`, because relative paths break on the
   `/blog/:id` route.

## Lilian-Weng conventions this blog adopts

- **Open with the framing question / motivation**, not a heading. One or two
  short paragraphs that say *why this matters* before the first `##`.
- **Section hierarchy:** `##` for numbered top-level sections, `###` for
  subsections. Keep headings terse, since they populate the on-page TOC.
- **Introduce named ideas in bold with an inline citation:**
  `**Kalman Filter** (Kalman 1960)` and refer to sources as `[Kalman 1960]`.
- **Display math** with `$$ … $$`, inline math with `$ … $`. Define every
  symbol in prose or a small table right after the equation.
- **Figures:** the image *alt text* becomes the italic centered caption, so
  write the caption there and end it with the source, e.g.
  `![The predict/update cycle. (Image source: Thrun et al. 2005)](/blog/cycle.png)`.
- **Citations as footnotes:** use GFM footnotes `text[^smith2020]` … and a
  definition block at the bottom; they render under an auto-styled
  "Footnotes" rule. Or write an explicit `## References` numbered list.
- **"Cited as:"** you do **not** write this. `BlogPost.tsx` appends a
  citation + BibTeX block automatically from the post's title/date/id.
- **Close with "Takeaways"** (bullet summary) and optionally a short
  "Open questions / Future directions" section.
- **Punctuation:** avoid dashes as punctuation. Use commas, colons, or
  periods instead, and reserve the hyphen for compound words (time-series,
  self-improvement).

---

## Template (copy from here down)

<!-- Opening: one or two paragraphs of motivation. State the question the post
     answers and why the reader should care. No heading here. -->

The one question this post answers is: *…?*

---

## 1. Background

Introduce the setting. When you name a framework, do it in bold with a
citation, e.g. **Some Method** (Author 2024), and refer back to it as
[Author 2024].[^author2024]

## 2. The Core Idea

$$
y = f(x; \theta)
$$

where $x$ is …, $\theta$ is …, and $f$ is ….

![A one-line caption that ends with the source. (Image source: Author 2024)](/blog/example.png)

## 3. Details

### 3.1 A subsection

Prose, tables, code blocks as needed.

## Takeaways

- Point one.
- Point two.

## References

[^author2024]: Author, A. (2024). *Title of the work*. Venue. https://example.com
