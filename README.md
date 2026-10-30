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
| `src/data/videos.ts` | The 6 Cloudflare Stream video slots: 4 YouTube + 2 Fortnite. |
| `src/data/projects.ts` | Project overview thumbnails, the two featured Fortnite games, and the Cybercab Hunter screenshot tour. |
| `src/data/skills.ts` | The six skill cards. |
| `public/resume.pdf` | The downloadable resume. Replace this file to update it. |

Entries marked `placeholder: true` still hold placeholder copy. Any empty image path shows designed placeholder art instead of a broken image.

### Adding images

Put images in `public/images/{youtube,fortnite,cybercabhunter}/`, preferably as `.webp`, then set the path in the data file, e.g. `image: "/images/fortnite/game-1.webp"`.

Recommended sizes:

- Video and game thumbnails: 1920×1080 (16:9).
- Cybercab Hunter tour screenshots: wide desktop captures, about 2400px across. Add or reorder them in `cybercabTour` in `src/data/projects.ts`; the list follows the order of the live site's homepage.

## Adding your 6 videos (Cloudflare Stream)

1. In the Cloudflare dashboard, go to **Stream → Upload** and upload the video file. Keep raw videos out of this repo; `.gitignore` already blocks `.mp4` and `.mov` files.
2. When processing finishes, open the video and copy its **Video ID** (a 32-character UID).
3. Paste it into `streamUid` for the right slot in `src/data/videos.ts`:
   - `youtubeVideos[0]` is the large featured video. `[1]`–`[3]` are the three smaller cards stacked beside it.
   - `fortniteVideos["game-1"]` and `["game-2"]` are the two featured Fortnite games.
4. Replace the placeholder `title` / `description`, then delete `placeholder: true`.
5. Optional: set `thumbnail` to a custom image. Without one, Cloudflare's auto-generated thumbnail is used.
6. Optional: if your Stream account uses a `customer-XXXX.cloudflarestream.com` subdomain, set `streamCustomerCode` in the same file.
7. In Stream, under the video's **Settings**, make sure **Require signed URLs** is off. Otherwise, public visitors can't play it.

The site only embeds Stream's public player by UID. No API token is used or needed in the frontend, and there's no upload endpoint. If you add an admin upload page later, put it behind authentication and call the Stream API from a server-side function using a secret.

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
