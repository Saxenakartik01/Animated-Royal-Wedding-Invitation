# Royal Wedding Invitation — React + TypeScript

A mobile-first wedding invitation inspired by your supplied storyboard. Built with React, TypeScript, Vite and CSS animation. Includes original AI-generated wedding artwork optimized as WebP.

## Run on your Mac

Requires Node.js 20.19+ (or Node.js 22+).

1. Extract the ZIP.
2. Open **Royal-Wedding-React** in VS Code. This is the folder containing `package.json`.
3. Open the terminal in this folder and run:

```bash
npm install
npm run dev
```

Open the Local URL printed by Vite. Do not open the source `index.html` by double-clicking it; React requires the development server.

### View on your phone

Keep your Mac and phone on the same Wi-Fi. Leave the terminal running and open Vite's **Network** URL on your phone, such as `http://192.168.1.10:5173`. If needed, allow incoming connections through your Mac firewall.

## Personalize

Edit `src/wedding.ts` for names, wedding date, events, story, venue, directions link, and WhatsApp number. The content is illustrative sample content, not a real event booking. Dates are in Indian Standard Time. Replace the sample venue and broad Udaipur map search with your exact venue URL before sharing.

Edit `src/App.tsx` for other copy, RSVP deadline and couple biographies. Update the wordmark and calendar UID when adapting for another couple. Edit `index.html` for the browser title and description.

### RSVP

The form prepares an RSVP message. It does **not** store responses on a server. With an empty `whatsappNumber`, guests can copy the message and send it to you. Enter your actual country-code-prefixed WhatsApp number (digits only) in `src/wedding.ts` to enable a WhatsApp send link. Guests review and send it in WhatsApp. Copying may require HTTPS or localhost; the preview text is selectable as a fallback.

### Optional music

Place your licensed `music.mp3` inside `public/`. Set `musicUrl: 'music.mp3'` in `src/wedding.ts`. The music button then appears; guests tap to play or pause. No audio is supplied or auto-played.

### Photos

Replace files in `public/images/`:
- `gate.webp`: portrait, closed symmetrical palace doors
- `couple.webp`: portrait with clear space in the upper half for invitation text
- `celebration.webp`: landscape wedding dance scene

The current gallery uses artistic crops of the supplied scene assets. Replace or extend the `gallery` array in `src/App.tsx` with personal photos. Images are generated illustrations of a wedding, not photographs of actual hosts or a verified venue.

### Build for hosting

```bash
npm run build
npm run preview
```

Upload the **contents** of `dist/` to a static host such as Netlify, Vercel, or GitHub Pages. `base: './'` supports subdirectory hosting. A production build is included in the ZIP. Serve it over HTTP, not `file://`.

## Included interactions

- Click-to-open dimensional palace gate
- Scroll reveal animation and smooth section navigation
- Responsive navigation and keyboard-accessible native dialogs
- Haldi, Mehendi and Shaadi detail dialogs
- Gallery lightbox with arrow buttons and keyboard navigation
- IST-based live countdown; stops cleanly at zero
- Downloadable calendar invitation
- Editable WhatsApp / copy-message RSVP
- Optional user-controlled music
- Reduced-motion accessibility support

Google Fonts provides Cormorant Garamond, Great Vibes, and Jost. Internet access loads these fonts; system fallback fonts are available. All image assets are local. No API keys or backend setup required.

## Verification

Production build and strict TypeScript checks completed. Visual browser interaction testing was not available in the build environment. Check your real content and exact venue before sending invitations.
