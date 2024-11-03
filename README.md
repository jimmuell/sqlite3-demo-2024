# Next.js CRUD App with SQLite

## Setup Instructions

1. Install dependencies:
```bash
npm install next react react-dom sqlite3 swr
npm install -D tailwindcss postcss autoprefixer
```

2. Create a new file called `.gitignore`:
```
node_modules
.next
data.db
```

3. Copy all the provided files into your project directory, maintaining the same directory structure:
   - `pages/` directory with `index.js`, `_app.js`, and `api/` files
   - `components/` directory with `UserForm.js`
   - `lib/` directory with `db.js`
   - `styles/` directory with `globals.css`
   - Configuration files: `tailwind.config.js`, `postcss.config.js`

4. Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

5. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Features
- Create, Read, Update, and Delete users
- Persistent SQLite database storage
- Real-time updates using SWR
- Responsive Tailwind CSS design

## Database
The app uses SQLite for data storage. The database file (`data.db`) will be created automatically when you first run the application.