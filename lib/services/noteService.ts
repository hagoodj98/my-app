import {
  createNote,
  deleteNote,
  getNotesByEntryId,
  updateNote,
} from "../repositories/noteRepository";

// Note: listNotesByEntryId and addNoteToEntry are currently the only functions in this service, but editNote and removeNote can be easily modified to include additional functionality if needed in the future (e.g. error handling, validation, etc.)

export async function listNotesByEntryId(entryId: string) {
  return getNotesByEntryId(entryId);
}
// Note: addNoteToEntry and listNotesByEntryId are currently the only functions in this service, but editNote and removeNote can be easily modified to include additional functionality if needed in the future (e.g. error handling, validation, etc.)
export async function addNoteToEntry(payload: {
  entryId: string;
  noteSubmission: string;
}) {
  return createNote(payload.entryId, payload.noteSubmission);
}
// Note: editNote and removeNote are currently the only functions in this service, but they can be easily modified to include additional functionality if needed in the future (e.g. error handling, validation, etc.)
export async function editNote(payload: {
  noteId: string;
  entryId: string;
  noteSubmission: string;
}) {
  await updateNote(payload.noteId, payload.entryId, payload.noteSubmission);
}
// Note: editNote and removeNote are currently the only functions in this service, but they can be easily modified to include additional functionality if needed in the future (e.g. error handling, validation, etc.)
export async function removeNote(payload: { noteId: string }) {
  await deleteNote(payload.noteId);
}
