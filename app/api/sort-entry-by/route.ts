import { NextRequest, NextResponse } from "next/server";
import { listSortedEntries } from "@/lib/services/entryService";
import { handleApiError } from "@/lib/utils/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // We retrieve the "order" query parameter from the request URL, which indicates the sorting order for the entries. If the "order" parameter is not provided, we default to "oldest". This allows clients to specify how they want the entries to be sorted when making a GET request to this API endpoint.
    const order = searchParams.get("order") || "oldest";
    const entries = await listSortedEntries(order);
    return NextResponse.json(entries);
  } catch (error) {
    return handleApiError(error);
  }
}
