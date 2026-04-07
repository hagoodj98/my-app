CREATE TABLE IF NOT EXISTS entries (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  cover_image_url_large TEXT,
  cover_image_url_medium TEXT,
  publish_date TEXT,
  authors TEXT,
  rating_average NUMERIC,
  subjects TEXT,
  rating_count INTEGER,
  subtitle TEXT,
  entry_created TIMESTAMP DEFAULT NOW(),
  isbn TEXT,
  work_key TEXT,
  description_summary TEXT
);

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  note TEXT NOT NULL,
  entry_id INTEGER REFERENCES entries(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);
