# BookBlog

A full-stack personal book-tracking blog where you can search for any book by ISBN, log it with a personal summary, leave notes on your reading progress, and manage all your entries from a clean, responsive UI.

---

## Purpose

This project was built as part of [The Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) on Udemy. The goal was to apply full-stack concepts — database design, REST API routes, React state management, and CI/CD — to a real, self-contained application.

The app integrates with the [Open Library API](https://openlibrary.org/developers/api) to automatically fetch book metadata (cover image, authors, publish date, subjects, description, ratings) when you add an entry by ISBN, so you never have to type that data by hand.

---

## Features

- **Search & add books** by ISBN — metadata fetched automatically from Open Library
- **Personal summary** to record your own thoughts on each book
- **Notes system** — add, edit, and delete reading notes per entry
- **Edit summary** inline without leaving the page
- **Delete entries** from the home feed
- **Sort entries** on the home page
- **Toast notifications** for every create / update / delete action
- **Responsive layout** with a sticky footer

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + MUI (Material UI v6) |
| Database | PostgreSQL (via `pg` pool) |
| Query layer | Raw SQL with a repository pattern |
| External API | Open Library Books API |
| Notifications | react-toastify |
| Unit testing | Vitest + React Testing Library |
| E2E testing | Playwright (Chromium) |
| CI/CD | GitHub Actions |
| Local dev DB | Docker (postgres:16) |

---

## Project Structure

```
my-app/
├── app/
│   ├── __tests__/          # Vitest unit tests
│   ├── api/                # Next.js API route handlers
│   │   ├── entries/        # GET all entries
│   │   ├── entry/[id]/     # GET / PUT / DELETE single entry
│   │   ├── newentry/       # POST — create entry from ISBN
│   │   ├── notes/[id]/     # GET / POST / PATCH / DELETE notes
│   │   └── sort-entry-by/  # GET sorted entries
│   ├── components/         # Shared UI components
│   │   └── ui/             # Generic Button, Input, Modal
│   ├── entry/[id]/         # Entry detail page
│   ├── findentry/          # Add new entry page
│   └── hooks/              # useEntries, useNotes custom hooks
├── e2e/                    # Playwright E2E tests
├── lib/
│   ├── database/           # PostgreSQL connection + schema.sql
│   ├── repositories/       # entryRepository, noteRepository
│   ├── services/           # entryService, noteService, openLibraryService
│   └── utils/              # Error handling, time formatting
└── docker-compose.yml      # Local PostgreSQL container
```

---

## Prerequisites

- **Node.js** v20+
- **Docker** (for local database) — or a locally running PostgreSQL instance

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/hagoodj98/bookblog.git
cd bookblog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Application database connection
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=bookblog

# Required by Docker Compose to initialise the container
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=bookblog
```

### 4. Start the database

```bash
docker compose up -d
```

This starts a `postgres:16` container, applies `lib/database/schema.sql` automatically, and exposes port `5432`.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript type check |
| `npm run test:unit` | Run Vitest unit tests (38 tests) |
| `npm run test:unit:watch` | Vitest in watch mode |
| `npm run test:e2e` | Run Playwright E2E tests (9 tests) |

---

## Testing

### Unit tests (Vitest + React Testing Library)

38 tests across 5 files covering:

- UI components — `CustomButton`, `CustomModal`, `Footer`
- Note flow — `NoteField`, `Notes`, `UpdateNote`
- Entry flow — `EditSummary`, `FindEntry` form validation and navigation
- Hooks — toast notifications fired after every CRUD operation

```bash
npm run test:unit
```

### E2E tests (Playwright)

9 tests covering the home page and the Find Entry flow (heading visibility, form validation, navigation).

```bash
# Install Chromium once
npx playwright install chromium

# Start production server, then run tests
npm run build && npm run start &
npm run test:e2e
```

---

## CI/CD

GitHub Actions runs on every push and pull request to `main`:

1. Spins up a `postgres:16` service container
2. Applies `lib/database/schema.sql`
3. Runs type-check → lint → unit tests → build → E2E tests

See [.github/workflows/ci.yml](.github/workflows/ci.yml) for the full configuration.

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS entries (
  id SERIAL PRIMARY KEY,
  isbn TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  authors TEXT,
  publish_date TEXT,
  subjects TEXT,
  cover_image_url_large TEXT,
  description_summary TEXT,
  rating_average NUMERIC,
  rating_count INT,
  summary TEXT,
  entry_created TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notes (
  note_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id INT REFERENCES entries(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## License

MIT
