import { NextResponse, NextRequest } from "next/server";
import {
  editEntrySummary,
  findEntryById,
  removeEntry,
} from "@/lib/services/entryService";
import { createRequestError, handleApiError } from "@/lib/utils/errors";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.pathname.split("/");
    const idParam = params[params.length - 1];

    if (!idParam) {
      throw createRequestError(400, "Missing id parameter");
    }

    const entry = await findEntryById(idParam);
    return NextResponse.json(entry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const params = req.nextUrl.pathname.split("/");
    const idParam = params[params.length - 1];

    if (!idParam) {
      throw createRequestError(400, "Missing id parameter");
    }

    const id = idParam;
    const body = await req.json();
    const summary = body?.prevSummary;

    if (typeof summary !== "string" || summary.trim().length === 0) {
      throw createRequestError(400, "prevSummary is required");
    }

    await editEntrySummary(id, summary);
    return NextResponse.json("Summary was updated.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const params = req.nextUrl.pathname.split("/");
    const idParam = params[params.length - 1];

    if (!idParam) {
      throw createRequestError(400, "Missing id parameter");
    }

    await removeEntry(idParam);
    return NextResponse.json("entry deleted");
  } catch (error) {
    return handleApiError(error);
  }
}
