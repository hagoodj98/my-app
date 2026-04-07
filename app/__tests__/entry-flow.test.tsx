import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { toast } from "react-toastify";
import EditSummary from "../components/EditSummary";
import FindEntry from "../findentry/page";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("next/font/google", () => ({
  Work_Sans: () => ({ className: "" }),
  Anton: () => ({ className: "" }),
}));

vi.mock("../styles/home.module.css", () => ({
  default: new Proxy({}, { get: (_, key) => String(key) }),
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useParams: () => ({}),
}));

// ─── EditSummary ──────────────────────────────────────────────────────────────

describe("EditSummary", () => {
  const updateEntrySummary = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => vi.clearAllMocks());

  it("renders the edit icon button", () => {
    render(
      <EditSummary
        id={1}
        entrySummary="Old summary"
        updateEntrySummary={updateEntrySummary}
      />,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens the modal when the edit button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <EditSummary
        id={1}
        entrySummary="Old summary"
        updateEntrySummary={updateEntrySummary}
      />,
    );
    await user.click(screen.getByRole("button"));
    // The modal title renders as an h2; the button inside also says "Update Summary"
    // so we target the heading specifically
    expect(
      screen.getByRole("heading", { name: "Update Summary" }),
    ).toBeInTheDocument();
  });

  it("pre-fills the modal textarea with the current summary", async () => {
    const user = userEvent.setup();
    render(
      <EditSummary
        id={1}
        entrySummary="My current summary"
        updateEntrySummary={updateEntrySummary}
      />,
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByDisplayValue("My current summary")).toBeInTheDocument();
  });

  it("calls updateEntrySummary with id and new text when saved", async () => {
    const user = userEvent.setup();
    render(
      <EditSummary
        id={5}
        entrySummary="Old summary"
        updateEntrySummary={updateEntrySummary}
      />,
    );
    await user.click(screen.getByRole("button")); // open modal
    const textarea = screen.getByDisplayValue("Old summary");
    await user.clear(textarea);
    await user.type(textarea, "New summary");
    fireEvent.click(screen.getByRole("button", { name: /update summary/i }));
    await waitFor(() => {
      expect(updateEntrySummary).toHaveBeenCalledWith(5, "New summary");
    });
  });
});

// ─── FindEntry page flow ──────────────────────────────────────────────────────

describe("FindEntry form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("renders the ISBN and summary input fields", () => {
    render(<FindEntry />);
    expect(screen.getByLabelText(/isbn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enter summary/i)).toBeInTheDocument();
  });

  it("renders the Add Entry submit button", () => {
    render(<FindEntry />);
    expect(
      screen.getByRole("button", { name: /add entry/i }),
    ).toBeInTheDocument();
  });

  it("disables the submit button and shows an error when input is under 10 chars", async () => {
    const user = userEvent.setup();
    render(<FindEntry />);
    await user.type(screen.getByLabelText(/isbn/i), "short");
    expect(screen.getByRole("button", { name: /add entry/i })).toBeDisabled();
    expect(screen.getByText(/minimum/i)).toBeInTheDocument();
  });

  it("enables the submit button once both fields reach 10+ characters", async () => {
    const user = userEvent.setup();
    render(<FindEntry />);
    await user.type(screen.getByLabelText(/isbn/i), "1234567890");
    await user.type(
      screen.getByLabelText(/enter summary/i),
      "This is a long enough summary",
    );
    expect(
      screen.getByRole("button", { name: /add entry/i }),
    ).not.toBeDisabled();
  });

  it("navigates to '/' on a successful form submission", async () => {
    const user = userEvent.setup();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 }),
    );
    render(<FindEntry />);
    await user.type(screen.getByLabelText(/isbn/i), "9780451524935");
    await user.type(
      screen.getByLabelText(/enter summary/i),
      "A dystopian novel set in a totalitarian society",
    );
    await user.click(screen.getByRole("button", { name: /add entry/i }));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("shows a success toast when the entry is created", async () => {
    const user = userEvent.setup();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 }),
    );
    render(<FindEntry />);
    await user.type(screen.getByLabelText(/isbn/i), "9780451524935");
    await user.type(
      screen.getByLabelText(/enter summary/i),
      "A dystopian novel set in a totalitarian society",
    );
    await user.click(screen.getByRole("button", { name: /add entry/i }));
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Entry added!");
    });
  });

  it("shows an error message when the API returns an error", async () => {
    const user = userEvent.setup();
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "Book not found" }), {
        status: 404,
      }),
    );
    render(<FindEntry />);
    await user.type(screen.getByLabelText(/isbn/i), "0000000000000");
    await user.type(
      screen.getByLabelText(/enter summary/i),
      "Some summary text here",
    );
    await user.click(screen.getByRole("button", { name: /add entry/i }));
    await waitFor(() => {
      expect(screen.getByText(/book not found/i)).toBeInTheDocument();
    });
  });
});
