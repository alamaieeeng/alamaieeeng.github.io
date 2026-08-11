# SimuSolv Website (Node.js)

A small Express server that serves the SimuSolv site (`/public`) and powers
the contact form through a `/api/contact` endpoint.

```
server.js            Express app + contact form API
package.json          Dependencies & start script
render.yaml            Optional one-click config for Render
.env.example           Template for optional SMTP email settings
public/                 The website itself (HTML, css/, js/)
```

## Run it locally

```bash
npm install
npm start
```

Visit http://localhost:3000

## Deploy for free from GitHub

Node.js needs somewhere that actually **runs** a server — GitHub itself
only hosts your code, it doesn't execute it. **Render** has a free tier
that deploys straight from a GitHub repo and works well for a small
Express app like this one. (Railway and Cyclic are similar alternatives.)

### 1. Push this project to GitHub

```bash
git init
git add .
git commit -m "SimuSolv website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on github.com first, then run the commands above
from inside this project folder.)

### 2. Deploy on Render (free)

1. Go to https://render.com and sign up / log in (you can sign up with
   your GitHub account).
2. Click **New +** → **Web Service**.
3. Connect your GitHub account if prompted, then select the repo you
   just pushed.
4. Render should auto-detect the settings from `render.yaml`. If asked
   manually, use:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Click **Create Web Service**. Render will build and deploy — this
   takes a couple of minutes on the first deploy.
6. You'll get a URL like `https://simusolv-website.onrender.com` — the
   site is live there immediately.
7. Every time you `git push` to `main`, Render redeploys automatically.

**Note on the free tier:** a free Render web service spins down after
15 minutes of no traffic and takes ~30–60 seconds to wake back up on the
next visit. That's fine for a low-traffic company site; if you outgrow
it, a paid plan removes the spin-down.

### 3. Point your GoDaddy domain at it (optional)

If you'd rather use your existing domain than the onrender.com URL:
1. In Render, open your service → **Settings** → **Custom Domains** →
   add your domain (e.g. `simusolv.com`).
2. Render will show you a CNAME record to add.
3. In GoDaddy, go to **My Products** → your domain → **DNS** → add that
   CNAME record.
4. DNS changes can take up to a few hours to propagate.

## Contact form email (optional)

By default, contact form submissions are written to the server log
(visible in Render's **Logs** tab) so nothing is lost, even without any
setup. To have them emailed to you instead:

1. Copy `.env.example` to `.env` for local testing, or add the same
   variables in Render's **Environment** tab for production.
2. For Gmail, generate an **App Password** (not your normal password):
   https://support.google.com/accounts/answer/185833
3. Set `SMTP_USER` / `SMTP_PASS` to that Gmail address and app password.

No SMTP setup is required for the site to work — the form will still
accept and log submissions either way.
