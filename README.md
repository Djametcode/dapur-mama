# Dapur Mama

Platform memasak untuk pemberdayaan perempuan di lingkungan RT/RW. Menyediakan menu masakan, tutorial, dan blog seputar konten memasak.

## Features

- **Resep Masakan** - Koleksi resep lengkap dengan bahan dan langkah-langkah
- **Tutorial Video** - Video tutorial memasak untuk pemula
- **Blog** - Artikel tips dan trik memasak
- **User Auth** - Register dan Login untuk akses konten

## Tech Stack

- **Frontend Web**: React.js + Vite + Tailwind CSS
- **Mobile App**: React Native + Expo
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose

## Project Structure

```
dapur-mama/
├── server/          # Backend API (Node.js/Express)
├── web/             # Frontend Web (React.js)
└── mobile/          # Mobile App (React Native)
```

## Backend Setup

```bash
cd server
npm install
cp .env.example .env  # Configure MongoDB URI
npm run seed           # Seed database
npm start              # Start server on port 3000
```

## Web Setup

```bash
cd web
npm install
npm run dev            # Start dev server on port 5173
```

## Mobile Setup

```bash
cd mobile
npm install
npx expo start         # Start Expo dev server
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/recipes | Get all recipes |
| GET | /api/recipes/:id | Get recipe by ID |
| GET | /api/tutorials | Get all tutorials |
| GET | /api/tutorials/:id | Get tutorial by ID |
| GET | /api/blogs | Get all blogs |
| GET | /api/blogs/:id | Get blog by ID |
| GET | /api/categories | Get all categories |

## Default Categories

- Sarapan
- Makan Siang
- Makan Malam
- Cemilan

## License

MIT
