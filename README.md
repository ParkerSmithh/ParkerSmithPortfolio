# Parker Smith — Portfolio

Single-page portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion for React and Lucide. It's hosted on GitHub Pages, and its videos play from Cloudflare Stream. The visual system follows [DESIGN.md](DESIGN.md).

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
| `src/data/videos.ts` | The video slots: 3 YouTube + 2 Fortnite. Each plays a direct .mp4 link or a Cloudflare Stream video. |
| `src/data/projects.ts` | Project overview thumbnails, the two featured Fortnite games, and the Cybercab Hunter screenshot tour. |
| `src/data/skills.ts` | The six skill cards. |
| `public/resume.pdf` | The downloadable resume. Replace this file to update it. |

Entries marked `placeholder: true` still hold placeholder copy. Any empty image path shows designed placeholder art instead of a broken image.

### Adding images

Put images in `public/images/{youtube,fortnite,cybercabhunter}/`, preferably as `.webp`, then set the path in the data file, e.g. `image: "/images/fortnite/game-1.webp"`.

Recommended sizes:

- Video and game thumbnails: 1920×1080 (16:9).
- Cybercab Hunter tour screenshots: wide desktop captures, about 2400px across. Add or reorder them in `cybercabTour` in `src/data/projects.ts`; the list follows the order of the live site's homepage.

## Adding videos

Videos live in `src/data/videos.ts`. `youtubeVideos[0]` is the large featured video, and the next two are the smaller cards stacked beside it. `fortniteVideos["game-1"]` and `["game-2"]` belong to the two featured Fortnite games.

Each entry plays from one of two sources.

**A direct .mp4 link (`src`).** This is what the YouTube videos use now, served from Cloudflare R2. Paste the file's public URL into `src` and set a `thumbnail`.

- Keep files web-sized: 1080p, H.264, about 5–8 Mbps. A 4K file at 30–150 Mbps will stall on most connections.
- Public `r2.dev` URLs are rate-limited by Cloudflare. For steady traffic, connect a custom domain to the bucket.

**Cloudflare Stream (`streamUid`).** Stream re-encodes uploads and adapts quality to each viewer's connection, so it's the best option for large or 4K files.

1. Upload the video in the Cloudflare dashboard under **Stream → Upload**.
2. Copy the video's UID into `streamUid`.
3. Under the video's **Settings**, make sure **Require signed URLs** is off.
4. Optionally, if your account uses a `customer-XXXX.cloudflarestream.com` subdomain, set `streamCustomerCode` in `src/data/videos.ts`.

The site never needs API tokens and has no upload endpoint.

## Deploying (GitHub Pages)

The site is live at **https://parkersmithh.github.io/ParkerSmithPortfolio/**.

Every push to `main` builds and deploys it automatically through `.github/workflows/deploy.yml`. You can follow each run in the repo's **Actions** tab.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

**Paths.** Because GitHub Pages serves this repo under `/ParkerSmithPortfolio/`, `vite.config.ts` sets that as the base path. Keep writing image paths as `/images/...` in the data files; they're prefixed automatically.

**Using a custom domain instead:**

1. Add the domain in **Settings → Pages**.
2. Set `BASE_PATH: /` as an `env` on the build step in the workflow.
3. Update the absolute URLs in `index.html` (`og:url`, `og:image`, `twitter:image`) and `site.url` in `src/data/portfolio.ts`.

The Content-Security-Policy is a `<meta>` tag in `index.html` and allows Cloudflare Stream iframes and thumbnails. If you embed other external services, add them there.

## Privacy

The residential street address doesn't appear anywhere in the site's HTML, metadata, or footer. `public/resume.pdf` is your original resume and **does** include the address. To keep it off the public site, export a version without it and replace `public/resume.pdf`.
