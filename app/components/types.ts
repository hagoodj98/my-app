export type BookData = {
  title: string;
  subtitle: string | null;
  publish_date: string | null;
  authors: string[];
  subjects: string[];
  rating_average: number;
  rating_count: number;
  cover_image_url_large: string;
  work_key: string | null;
  cover_image_url_medium: string;
  description_summary: string | null;
};

export type Entry = BookData & {
  id?: number;
  isbn: string;
  summary: string;
  entry_created: string;
};

export type OpenLibrary = {
  authors: { name: string }[];
  cover: {
    large: string;
    medium: string;
    small: string;
  };
  ebooks: {
    availability: string;
  }[];
  publishers: { name: string }[];
  publish_date: string | null;
  subjects: { name: string }[];
  subtitle: string | null;
  title: string;
  key: string;
  links?: { url: string; title: string }[];
  url: string | null;
  workKey: string | null;
  works: { key: string }[];
  description?: string | { value: string } | null;
};
export type EntryInput = {
  isbn: string;
  summary: string;
};

export type NoteType = {
  note_id: string;
  id?: string;
  entry_id: string;
  note: string;
  created_at: string;
};
