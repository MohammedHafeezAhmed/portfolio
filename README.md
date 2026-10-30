# Portfolio Studio

NOVACORE is a colourful, responsive portfolio for Mohammed Hafeez Ahmed, with the original animated mascot, project deep-dives, a mini arcade game, and an extended private admin studio. Portfolio content is saved on the server in `server/data.json`, so changes survive restarts.

## Requirements
- Node.js 18 or newer
- npm (included with Node.js)

## Start in VS Code

The development launcher starts Node and Vite directly (not through `cmd.exe`), avoiding common Windows `concurrently`/PATH errors. On Windows PowerShell, use the `npm.cmd` commands below.
1. Extract this ZIP and open the `portfolio-studio` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Install dependencies:
   ```bash
   npm.cmd install
   ```
4. Start the frontend and backend together:
   ```bash
   npm.cmd run dev
   ```
5. Open **http://localhost:5173** for the public portfolio.
6. Click **Studio login** (or open `http://localhost:5173/#admin`).

### Admin login
- Default password: `portfolio123`
- Change it before using this on a public network. For local development, set `ADMIN_PASSWORD` in your terminal before starting the server, or configure your environment. The example `.env.example` is a reference; this starter does not automatically load `.env` files.

PowerShell example:
```powershell
$env:ADMIN_PASSWORD = "your-own-password"
npm.cmd run dev
```

## Portfolio content
- Includes Hafeez’s current profile, education, skills, certifications, interests, and three clearly labelled prototypes/in-progress projects. The projects are not represented as deployed products.
- Each project opens a detailed view with three screenshot placeholders, tech tags, links, and a feedback form. Add image URLs and project links in Studio → Split Trash → edit the Projects section → Projects data (JSON).
- The in-page “Hafeez Quest” arcade area supports Easy, Medium, and Hard modes, touch/click jumping, keyboard controls, and randomized obstacle layouts.
- LinkedIn and GitHub are demo links; replace them in Studio → Add-on → Edit your identity.

## Dashboard features
- **Add-on:** create sections without changing source code.
- **Split Trash:** inspect, edit, and remove sections from the public site.
- **History:** review logged changes, undo a change, or redo the latest undo.
- **Extra:** long-term editable fields for experience, research, achievements, publications, future certifications, social links, and more. Empty fields are kept out of the public page until you choose to publish them.
- **Edit your identity:** update your name, tagline, intro, location, email and availability.
- Data is stored in `server/data.json`; back up this file to keep your content safe.

## Production build
```bash
npm.cmd run build
npm.cmd start
```
Then open `http://localhost:3001`. The production server serves the built frontend and API together.

## Notes
- Default Studio password: `portfolio123`. The public portfolio does not require a password.
- Contact form opens the visitor’s configured email client. Project feedback is currently a UI prototype and is not persisted to the server.
- The API is intended for local development. Before public deployment, replace the starter password-based authentication with a production-grade setup, add rate limiting and secure session handling, and deploy behind HTTPS.
- Google Fonts are loaded remotely; local system fallbacks are provided.
