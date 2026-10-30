# Parker Smith — Portfolio

Single-page portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion for React and Lucide. It's hosted on Cloudflare Pages, and its videos play from Cloudflare Stream. The visual system follows [DESIGN.md](DESIGN.md).

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build
```

## Editing content

All content lives in `src/data/`. You don't need to touch the components.

| File | What it controls |
|---|---|
| `src/data/portfolio.ts` | Contact details, hero copy, about/education, YouTube stats, Fortnite stats, Cybercab Hunter copy, nav. Also optional LinkedIn/GitHub links (empty = hidden). |
| `src/data/videos.ts` | The 7 Cloudflare Stream video slots: 5 YouTube + 2 Fortnite. |
| `src/data/projects.ts` | Project overview thumbnails, the two featured Fortnite games, and the Cybercab Hunter screenshots. |
| `src/data/skills.ts` | The six skill cards. |
| `public/resume.pdf` | The downloadable resume. Replace this file to update it. |

Entries marked `placeholder: true` still hold placeholder copy. Any empty image path shows designed placeholder art instead of a broken image.

### Adding images

Put images in `public/images/{youtube,fortnite,cybercabhunter}/`, preferably as `.webp`, then set the path in the data file, e.g. `image: "/images/fortnite/game-1.webp"`.

Recommended sizes:

- Video and game thumbnails: 1920×1080 (16:9).
- Cybercab Hunter desktop screenshots: 2880×1800 (16:10).
- Cybercab Hunter mobile screenshot: 1170×2532.

## Adding your 7 videos (Cloudflare Stream)

1. In the Cloudflare dashboard, go to **Stream → Upload** and upload the video file. Keep raw videos out of this repo; `.gitignore` already blocks `.mp4` and `.mov` files.
2. When processing finishes, open the video and copy its **Video ID** (a 32-character UID).
3. Paste it into `streamUid` for the right slot in `src/data/videos.ts`:
   - `youtubeVideos[0]` is the large featured video. `[1]`–`[4]` are the four smaller cards.
   - `fortniteVideos["game-1"]` and `["game-2"]` are the two featured Fortnite games.
4. Replace the placeholder `title` / `description`, then delete `placeholder: true`.
5. Optional: set `thumbnail` to a custom image. Without one, Cloudflare's auto-generated thumbnail is used.
6. Optional: if your Stream account uses a `customer-XXXX.cloudflarestream.com` subdomain, set `streamCustomerCode` in the same file.
7. In Stream, under the video's **Settings**, make sure **Require signed URLs** is off. Otherwise, public visitors can't play it.

The site only embeds Stream's public player by UID. No API token is used or needed in the frontend, and there's no upload endpoint. If you add an admin upload page later, put it behind authentication and call the Stream API from a server-side function using a secret.

## Deploying to Cloudflare Pages

**Option A: Git (recommended).** Push this folder to a GitHub repo. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and use these settings:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION = 20` (or newer)

**Option B: Direct upload.** Run `npx wrangler login` once, then `npm run deploy`.

`public/_headers` sets the security headers, caching, and the resume's download filename. Its Content-Security-Policy allows Stream iframes and thumbnails. If you add other external services, update it there.

After deploying, set your real domain in **two places** so link previews resolve:

- In `index.html`, change `og:image` and `twitter:image` to the absolute URL, e.g. `https://yourdomain.com/og-image.png`.
- In `src/data/portfolio.ts`, set `site.url`.

## Privacy

The residential street address doesn't appear anywhere in the site's HTML, metadata, or footer. `public/resume.pdf` is your original resume and **does** include the address. To keep it off the public site, export a version without it and replace `public/resume.pdf`.
