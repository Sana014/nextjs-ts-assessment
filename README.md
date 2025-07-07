# Product Listing App

A visually appealing, responsive Next.js app for managing your own product listings. Built with TypeScript, Tailwind CSS, and Zod for robust validation.

## Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Features
- Add, edit, and delete products (CRUD) with localStorage persistence
- Dynamic product detail pages via Next.js dynamic routing
- Image upload and preview for products
- INR (₹) price formatting with Indian number system
- Search bar and dark/light theme toggle in Navbar
- Responsive, modern UI with Tailwind CSS
- Clean, reusable components and organized folder structure

## Folder Structure
```
app/
  components/      # Navbar, ThemeProvider, Footer (reusable UI)
  create/          # Add product page
  edit/            # Edit product list and edit by ID
  product/[id]/    # Dynamic product detail pages
  delete/          # Delete product page (if used)
  globals.css      # Global styles
  error.tsx        # Error boundary (renders nothing)
  layout.tsx       # App layout
public/            # Static assets (output.css, etc.)
tailwind.config.js # Tailwind config
postcss.config.js  # PostCSS config
package.json       # Project dependencies and scripts
tsconfig.json      # TypeScript config
```

## Tech Stack
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) (input validation)

## Known Limitations & Future Improvements
- All product data is stored in your browser's localStorage (no backend, so data is device-specific).
- No user authentication or multi-user support.
- No pagination or filtering for large product lists.
- Image uploads are stored as base64 data URLs in localStorage, which may increase storage usage for many/large images.
- Some unused folders/files (e.g., `manage/`, `manage_deleted/`) can be removed for a cleaner structure.
- Future: Add backend/database support, user accounts, product categories, and improved image handling.

## Deployment (Vercel)
You can easily deploy this project to [Vercel](https://vercel.com/):

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to https://vercel.com/import and import your repository.
3. Follow the prompts (Vercel will auto-detect Next.js and set everything up).
4. Click "Deploy" and your app will be live in seconds!

No extra configuration is needed for a basic Next.js app.

---

Feel free to customize and extend this project for your needs!
