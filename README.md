# Pulse Web
Browser client for existing Pulse accounts: email/password login, discovery feed, Reels playback, existing text conversations, profile and public reward Mail. Uses Pulse's existing Supabase RLS and RPC permissions; the publishable key is intentionally public.

Serve `dist` over HTTPS. No build step. Supabase JS is pinned to 2.99.1 and loaded from jsDelivr. No service-role or payment secrets belong in this repository.

## Scope
This is a first web beta, not feature parity with the native client. Account creation, attachments, upload editing, live hosting, native calling, payment checkout and offline downloads remain in the native app. No demo users, fake messages or fabricated view counts.

## Design
Matches the native app's charcoal and mint styling, Pulse logo, Home feed tabs, six mobile navigation destinations, dark conversation bubbles and profile screen. Desktop uses an expanded navigation rail. For You currently uses discovery posts; interest ranking remains native-only.

## Source
GitHub: https://github.com/iszyisrael04-art/Pulse-web
Static entrypoint: `dist/index.html`. Serve the `dist` directory over HTTPS.

## Validation
JavaScript syntax checked. Real account workflows require signed-in browser/device testing. Never place an administrator/service key in browser code.
