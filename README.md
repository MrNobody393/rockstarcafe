# Rockstar Cafe & Restaurant

A responsive Next.js site for Rockstar Cafe in Islamabad, built with TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site has a one-time video intro on first visit, a full menu at `/menu`, contact details at `/find-us`, and a cart at `/cart`.

## Structure

- `src/app/page.tsx` — home route and restaurant structured data.
- `src/app/menu/page.tsx` — full menu route.
- `src/app/cart/page.tsx` — cart route.
- `src/app/layout.tsx` — shared document metadata and cart provider.
- `src/app/globals.css` — responsive layout and visual styles.
- `src/data/menu.ts` — menu products, categories, prices, and image paths.
- `src/components/home-page.tsx` — video hero and home page.
- `src/components/menu-page.tsx` — category filters and add-to-cart buttons.
- `src/components/cart-context.tsx` — persistent browser cart state.
- `src/components/cart-page.tsx` — quantities, subtotal, and checkout confirmation.
- `public/assets/rockstar-hero.mp4` — supplied background video.
- `public/assets/` — cafe photography, product images, menu, and logo.

## Change the hero video

Replace `public/assets/rockstar-hero.mp4` to keep the current path, or update the `<source>` in `src/components/home-page.tsx`. The muted video plays once on the first home-page visit. Returning to the home page uses `public/assets/Hero section.png` as the static hero image. Reduced-motion preferences skip the video intro.

## Edit the menu

Change `src/data/menu.ts`. Each product lists its name, category, price in rupees, image under `public/assets`, and a short note. The displayed prices come from the supplied menu artwork. The menu page filters by category and adds items to the cart. Cart contents persist in local storage.

## Checkout status

The cart supports adding items, changing quantities, removing products, and viewing a subtotal. Checkout currently displays a confirmation preview only; it does not transmit an order to the cafe. The contact form is also a demo and does not transmit messages. Connect and configure an order endpoint and a message recipient before using the site to receive orders or contact submissions. The supplied cafe phone number is a landline.

## Production deployment

Run `npm run build` before deploying and serve the generated Next.js app with a compatible Node.js host. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin (for example, `https://your-domain.example`) so social image URLs and restaurant structured data use the live domain. The menu, cart, and informational pages work without server credentials, but orders and contact messages remain local demo flows until a backend or form service is connected.
