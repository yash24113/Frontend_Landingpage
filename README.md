# City/Product Static Site with Next.js & MongoDB

## Setup

1. Clone the repo and install dependencies:
   ```
   npm install
   ```

2. Add your MongoDB connection string to `.env.local`:
   ```
   MONGODB_URI=your-mongodb-uri
   ```

3. Ensure your MongoDB has `cities` and `products` collections, each with `name` and `slug` fields.

4. Run the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   npm start
   ```

## How it works

- Statically generates a page for every city/product combination.
- Uses slugs for clean URLs.
- Add/remove cities or products in MongoDB, then rebuild to update pages.
- Uses ISR (Incremental Static Regeneration) for on-demand updates. "# Frontend_Landingpage" 
