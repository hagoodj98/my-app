import { NextResponse } from "next/server";

class RequestError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function createRequestError(statusCode: number, message: string): RequestError {
  return new RequestError(statusCode, message);
}

export function handleApiError(err: unknown) {
  console.error(err);

  if (err instanceof RequestError && err.statusCode === 400) {
    return NextResponse.json(err.message, { status: 400 });
  }

  if (typeof err === "object" && err !== null) {
    const dbErr = err as { code?: string; message?: string };
    if (dbErr.code === "23505") {
      return NextResponse.json("Entry already exists, try again");
    }
    if (dbErr.message === "Entry does not exist, try again") {
      return NextResponse.json("Entry does not exist, try again");
    }
  }

  return NextResponse.json("Internal server error", { status: 500 });
}
