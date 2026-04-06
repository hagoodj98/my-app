import { getNotesByEntryId } from "@/lib/repositories/noteRepository";
import {
  addNoteToEntry,
  editNote,
  removeNote,
} from "@/lib/services/noteService";
import { handleApiError } from "@/lib/utils/errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.pathname.split("/");
    const idParam = params[params.length - 1];
    const response = await getNotesByEntryId(idParam);

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);

    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch notes" }),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { newNote, id } = body;
    const result = await addNoteToEntry({
      entryId: id,
      noteSubmission: newNote,
    });
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const params = request.nextUrl.pathname.split("/");
    const idParam = params[params.length - 1];
    await removeNote({
      noteId: idParam,
    });
    return NextResponse.json("Note deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const params = req.nextUrl.pathname.split("/");
    const idParam = params[params.length - 1];
    const body = await req.json();
    const { prevNote, id } = body;
    const note_id = String(id);
    await editNote({
      noteId: note_id,
      entryId: idParam,
      noteSubmission: prevNote,
    });
    return NextResponse.json("Note updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
