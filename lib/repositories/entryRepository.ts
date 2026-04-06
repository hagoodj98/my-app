import { Entry } from "@/app/components/types";
import db from "../database/connection";

export async function getAllEntries() {
  const result = await db.query("SELECT * FROM entries ORDER BY id ASC");
  return result.rows;
}

export async function getEntryById(id: string) {
  const result = await db.query("SELECT * FROM entries WHERE id = $1", [id]);
  return result.rows;
}

export async function createEntry(entry: Entry) {
  const result = await db.query(
    "INSERT INTO entries (title, summary, cover_image_url_large, cover_image_url_medium, publish_date, authors, rating_average, subjects, rating_count, subtitle, entry_created, isbn, work_key, description_summary) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
    [
      entry.title,
      entry.summary,
      entry.cover_image_url_large,
      entry.cover_image_url_medium,
      entry.publish_date,
      entry.authors,
      entry.rating_average,
      entry.subjects,
      entry.rating_count,
      entry.subtitle,
      entry.entry_created,
      entry.isbn,
      entry.work_key,
      entry.description_summary,
    ],
  );

  return result.rows[0];
}

export async function updateEntrySummary(id: string, summary: string) {
  await db.query("UPDATE entries SET summary = $1 WHERE id = $2", [
    summary,
    id,
  ]);
}

export async function deleteEntry(id: string) {
  await db.query("DELETE FROM entries WHERE id = $1", [id]);
}

export async function getEntriesByRecency() {
  const result = await db.query(
    "SELECT * FROM entries ORDER BY entry_created DESC",
  );
  return result.rows;
}
// Note: getEntriesByOldest and getEntriesByRecency are currently the same, but they can be easily modified to sort by a different column if needed in the future
export async function getEntriesByOldest() {
  const result = await db.query("SELECT * FROM entries ORDER BY id ASC");
  return result.rows;
}
// Note: getEntriesByTitle and getEntriesByRelevance are currently the same, but they can be easily modified to sort by a different column if needed in the future
export async function getEntriesByTitle() {
  const result = await db.query("SELECT * FROM entries ORDER BY title ASC");
  return result.rows;
}
// Note: getEntriesByTitle and getEntriesByRelevance are currently the same, but they can be easily modified to sort by a different column if needed in the future
export async function getEntriesByRelevance() {
  const result = await db.query(
    "SELECT * FROM entries ORDER BY rating_average DESC",
  );
  return result.rows;
}
