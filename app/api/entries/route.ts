import { getAllEntries } from "@/lib/repositories/entryRepository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getAllEntries();

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);

    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch entries" }),
      { status: 500 },
    );
  }
}
