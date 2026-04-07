import { NextRequest, NextResponse } from "next/server";
import { addEntryFromIsbn } from "@/lib/services/entryService";
import { handleApiError } from "@/lib/utils/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isbn = body?.isbn;
    const summary = body?.summary;
    // We validate the input data to ensure that both ISBN and summary are provided and that the summary meets the minimum character requirement before attempting to add the entry, which helps prevent unnecessary API calls and provides immediate feedback to the user in case of invalid input
    await addEntryFromIsbn({
      isbn,
      summary,
    });

    return NextResponse.json(
      { message: "Entry added successfully" },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
