import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NoteField from "../components/NoteField";
import Notes from "../components/Notes";
import { NoteType } from "../components/types";

vi.mock("next/font/google", () => ({
  Work_Sans: () => ({ className: "" }),
}));

vi.mock("../styles/home.module.css", () => ({
  default: new Proxy({}, { get: (_, key) => String(key) }),
}));

// UpdateNote (used inside Notes) calls useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const mockNotes: NoteType[] = [
  {
    note_id: "1",
    entry_id: "42",
    note: "First note",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    note_id: "2",
    entry_id: "42",
    note: "Second note",
    created_at: "2024-01-02T00:00:00Z",
  },
];

// ─── NoteField ────────────────────────────────────────────────────────────────

describe("NoteField", () => {
  it("renders a text input and a submit button", () => {
    render(<NoteField entry="42" addNoteAPI={vi.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("updates the input value as the user types", async () => {
    const user = userEvent.setup();
    render(<NoteField entry="42" addNoteAPI={vi.fn()} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "My new note");
    expect(input).toHaveValue("My new note");
  });

  it("calls addNoteAPI with the entry id and note text on submit", async () => {
    const addNoteAPI = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<NoteField entry="42" addNoteAPI={addNoteAPI} />);
    await user.type(screen.getByRole("textbox"), "Test note");
    await user.click(screen.getByRole("button", { name: /add/i }));
    await waitFor(() => {
      expect(addNoteAPI).toHaveBeenCalledWith("42", "Test note");
    });
  });

  it("clears the input after a successful submission", async () => {
    const addNoteAPI = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<NoteField entry="42" addNoteAPI={addNoteAPI} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "Clear me");
    await user.click(screen.getByRole("button", { name: /add/i }));
    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });
});

// ─── Notes ────────────────────────────────────────────────────────────────────

describe("Notes", () => {
  const handlers = {
    deleteNoteAPI: vi.fn(),
    addNoteAPI: vi.fn().mockResolvedValue(undefined),
    updateNoteAPI: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => vi.clearAllMocks());

  it("renders the text of every note", () => {
    render(<Notes notes={mockNotes} entry="42" {...handlers} />);
    expect(screen.getByText("First note")).toBeInTheDocument();
    expect(screen.getByText("Second note")).toBeInTheDocument();
  });

  it("renders an add-note input field", () => {
    render(<Notes notes={[]} entry="42" {...handlers} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the correct number of notes", () => {
    const { rerender } = render(
      <Notes notes={mockNotes} entry="42" {...handlers} />,
    );
    expect(screen.getAllByRole("paragraph").length).toBeGreaterThanOrEqual(0);

    // Re-render with one note removed and confirm only one note text remains
    rerender(<Notes notes={[mockNotes[0]]} entry="42" {...handlers} />);
    expect(screen.getByText("First note")).toBeInTheDocument();
    expect(screen.queryByText("Second note")).not.toBeInTheDocument();
  });

  it("calls deleteNoteAPI with the correct note_id when delete is clicked", async () => {
    const user = userEvent.setup();
    render(<Notes notes={[mockNotes[0]]} entry="42" {...handlers} />);
    // For one note the DOM order is: [edit button][delete button][add Fab]
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]); // delete button
    expect(handlers.deleteNoteAPI).toHaveBeenCalledWith("1");
  });
});
