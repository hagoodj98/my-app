import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { toast } from "react-toastify";
import { useNotes } from "../hooks/useNotes";
import { useEntries } from "../hooks/useEntries";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const jsonResponse = (data: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(data), { status }));

// ─── useNotes ─────────────────────────────────────────────────────────────────

describe("useNotes – toast notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() => jsonResponse([])),
    );
  });

  it("shows 'Note added' toast after addNoteAPI succeeds", async () => {
    const { result } = renderHook(() => useNotes("42"));
    await act(async () => {}); // flush initial fetch
    await act(async () => {
      await result.current.addNoteAPI("42", "New note");
    });
    expect(toast.success).toHaveBeenCalledWith("Note added");
  });

  it("shows 'Note deleted' toast after deleteNoteAPI succeeds", async () => {
    const { result } = renderHook(() => useNotes("42"));
    await act(async () => {});
    await act(async () => {
      await result.current.deleteNoteAPI("1");
    });
    expect(toast.success).toHaveBeenCalledWith("Note deleted");
  });

  it("shows 'Note updated' toast after updateNoteAPI succeeds", async () => {
    const { result } = renderHook(() => useNotes("42"));
    await act(async () => {});
    await act(async () => {
      await result.current.updateNoteAPI({
        prevNote: { note: "Updated text", noteId: "1" },
      });
    });
    expect(toast.success).toHaveBeenCalledWith("Note updated");
  });
});

// ─── useEntries ───────────────────────────────────────────────────────────────

describe("useEntries – toast notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() => jsonResponse([])),
    );
  });

  it("shows 'Entry deleted' toast after deleteEntry succeeds", async () => {
    const { result } = renderHook(() => useEntries());
    await act(async () => {});
    await act(async () => {
      await result.current.deleteEntry(1);
    });
    expect(toast.success).toHaveBeenCalledWith("Entry deleted");
  });

  it("shows 'Summary updated' toast after updateEntrySummary succeeds", async () => {
    const { result } = renderHook(() => useEntries());
    await act(async () => {});
    await act(async () => {
      await result.current.updateEntrySummary(1, "New summary text");
    });
    expect(toast.success).toHaveBeenCalledWith("Summary updated");
  });
});
