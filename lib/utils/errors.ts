import { NextResponse } from "next/server";

export function createRequestError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function handleApiError(err) {
  console.error(err);

  const requestError =
    /** @type {{ statusCode?: number; message?: string }} */ err;
  if (
    requestError.statusCode === 400 &&
    typeof requestError.message === "string"
  ) {
    return NextResponse.json(requestError.message, { status: 400 });
  }

  const dbError = /** @type {{ code?: string; message?: string }} */ err;
  if (dbError.code === "23505") {
    return NextResponse.json("Entry already exists, try again");
  }

  if (dbError.message === "Entry does not exist, try again") {
    return NextResponse.json("Entry does not exist, try again");
  }

  return NextResponse.json("Internal server error", { status: 500 });
}
