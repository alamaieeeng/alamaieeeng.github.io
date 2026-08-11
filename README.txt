SimuSolv — clean GitHub Pages package (fixes the repo mix-up)
================================================================

Your repo (alamaieeeng/alamaieeeng.github.io) currently has a mix of
Node.js files and static site files in the wrong places, which is why
the site isn't loading correctly. This package fixes that.


WHAT'S IN THIS ZIP (all belongs at the REPO ROOT)
---------------------------------------------------
CNAME                          simusolv.com  (your custom domain)
index.html                     Home  <- GitHub Pages needs this exact name
sensor-research.html
rf-em-research.html
rf-me-consultancy.html
digital-ai-engineering.html
about-contact.html
css/style.css
js/main.js


STEP 1 — DELETE these from the repo (github.com, in the repo, click each
file > trash icon > commit)
---------------------------------------------------------------------------
- main.html
- simu-solv.html
- server.js
- package.json
- render.yaml
- the entire "public" folder (open it, delete each file inside; the
  folder disappears once it's empty)

These are leftovers from the Node.js/Render version and don't do
anything on GitHub Pages — keeping them just causes confusion, so it's
cleanest to remove them from this repo.

(Keep README.md and CNAME — CNAME is replaced by the one in this zip,
same content, so overwriting it is fine too.)


STEP 2 — UPLOAD the files from this zip to the repo ROOT
------------------------------------------------------------
1. Go to https://github.com/alamaieeeng/alamaieeeng.github.io
2. Click "Add file" > "Upload files"
3. Unzip this package on your computer, then drag in:
   - index.html
   - sensor-research.html
   - rf-em-research.html
   - rf-me-consultancy.html
   - digital-ai-engineering.html
   - about-contact.html
   - the css folder
   - the js folder
   - CNAME (overwriting the existing one is fine)
4. Make sure none of these land inside a subfolder — they need to sit
   at the same level as README.md.
5. Scroll down, write a commit message like "Clean up site structure",
   click "Commit changes".


STEP 3 — CONFIRM
--------------------
1. In the repo, Settings > Pages should show "Your site is live at ..."
   with a green checkmark once it rebuilds (usually 1-2 minutes).
2. Visit https://alamaieeeng.github.io — should load the Home page.
3. https://simusolv.com and https://www.simusolv.com will work once the
   GoDaddy DNS records are also set up (see earlier instructions — A
   records for @ pointing to GitHub Pages' IPs, and a CNAME for www
   pointing to alamaieeeng.github.io). If you haven't done that part
   yet, the .github.io URL is the fastest way to confirm the site
   itself is fixed.


NOTE ON THE CONTACT FORM
----------------------------
This static version's contact form opens the visitor's email client
(no backend, since GitHub Pages can't run one). If you want a real
in-page submission with an emailed notification, that's what the
separate Node.js/Render setup was for — it needs to be deployed to
Render (or similar), not to this Pages repo. Let me know if you'd like
help getting that live too.
