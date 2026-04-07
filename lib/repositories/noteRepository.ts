import db from "../database/connection";

export async function getNotesByEntryId(entryId: string) {
  const result = await db.query(
    "SELECT notes.id AS note_id, notes.note, notes.entry_id, notes.created_at FROM notes JOIN entries ON entries.id = entry_id WHERE entry_id = $1 ORDER BY notes.id ASC",
    [entryId],
  );

  return result.rows;
}

export async function createNote(entryId: string, noteSubmission: string) {
  const result = await db.query(
    "INSERT INTO notes (note, entry_id) VALUES($1, $2) RETURNING *",
    [noteSubmission, entryId],
  );

  return result.rows[0];
}

export async function updateNote(
  noteId: string,
  entryId: string,
  noteSubmission: string,
) {
  await db.query(
    "UPDATE notes SET note = $1 WHERE entry_id = $2 AND notes.id = $3",
    [noteSubmission, entryId, noteId],
  );
}

export async function deleteNote(noteId: string) {
  await db.query("DELETE FROM notes WHERE id = $1", [noteId]);
}
