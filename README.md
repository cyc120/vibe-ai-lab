# VIBE AI LAB

VIBE AI LAB recruitment site, built with React, TypeScript, and Vite. It is a single-page site that uses hash anchors, so no client-side router or rewrite rule is required for section navigation.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

`npm run build` runs the TypeScript check and creates the deployable `dist` directory.

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, select **Add New Project** and import the Git repository.
3. Select **Vite** as the Framework Preset.
4. Set Build Command to `npm run build`.
5. Set Output Directory to `dist`.
6. Deploy. No environment variables are required for the current project.

## Deploy to GitHub Pages

The Vite `base` setting uses relative production asset paths, so the generated `dist` directory also works when the site is served from a repository subpath such as `https://<user>.github.io/<repository>/`.

Build the project with `npm run build`, then publish the contents of `dist` using your preferred GitHub Pages workflow. The site uses hash anchors rather than browser routes, so reloading links such as `#join` does not require an SPA fallback.

## Environment Variables

The current interactive mini-games use local simulation logic only and require no API Key.

If a real LLM API is added later, never write an API Key into the React frontend or a `VITE_*` variable. Call it through a Serverless Function or backend proxy, and store the secret only on that server-side runtime.

## Site Configuration

Edit `src/config/site.ts` to update public recruitment information. The primary fields are:

- `joinUrl`
- `githubUrl`
- `qqGroup`
- `contact`

QR code images are served from `public/join-qr.jpg` and `public/wechat-qr.jpg`. Public assets are resolved through Vite's base URL so they work on Vercel and GitHub Pages.
