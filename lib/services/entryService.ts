import {
  createEntry,
  deleteEntry,
  getAllEntries,
  getEntriesByOldest,
  getEntriesByRecency,
  getEntriesByRelevance,
  getEntriesByTitle,
  getEntryById,
  updateEntrySummary,
} from "../repositories/entryRepository";
import { fetchBookDataByIsbn } from "./openLibraryService";
import { getTime } from "../utils/time";

export async function listEntries() {
  return getAllEntries();
}

export async function findEntryById(id: string) {
  return getEntryById(id);
}
export async function editEntrySummary(id: string, summary: string) {
  await updateEntrySummary(id, summary);
}
export async function removeEntry(id: string) {
  await deleteEntry(id);
}
export async function addEntryFromIsbn(payload: {
  isbn: string;
  summary: string;
}) {
  const { isbn, summary } = payload;
  const bookData = await fetchBookDataByIsbn(isbn);
  return createEntry({
    ...bookData,
    summary: summary,
    entry_created: getTime(),
    isbn: isbn,
  });
}

export async function listSortedEntries(sortBy: string) {
  if (sortBy === "recency") {
    return getEntriesByRecency();
  }

  if (sortBy === "oldest") {
    return getEntriesByOldest();
  }

  if (sortBy === "title") {
    return getEntriesByTitle();
  }

  return getEntriesByRelevance();
}
