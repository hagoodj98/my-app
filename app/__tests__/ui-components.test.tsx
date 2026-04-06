import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CustomButton from "../components/ui/Button";
import CustomModal from "../components/ui/Modal";
import Footer from "../components/footer";

vi.mock("next/font/google", () => ({
  Work_Sans: () => ({ className: "" }),
  Anton: () => ({ className: "" }),
}));

// ─── CustomButton ────────────────────────────────────────────────────────────

describe("CustomButton", () => {
  it("renders its children", () => {
    render(<CustomButton>Save</CustomButton>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("fires onClick when clicked", () => {
    const onClick = vi.fn();
    render(<CustomButton onClick={onClick}>Click</CustomButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is true", () => {
    render(<CustomButton disabled>Disabled</CustomButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <CustomButton disabled onClick={onClick}>
        No-op
      </CustomButton>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── CustomModal ─────────────────────────────────────────────────────────────

describe("CustomModal", () => {
  it("renders title and children when open", () => {
    render(
      <CustomModal open title="Dialog Title" onClose={vi.fn()}>
        <p>Body content</p>
      </CustomModal>,
    );
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <CustomModal open title="Close Test" onClose={onClose}>
        <div />
      </CustomModal>,
    );
    fireEvent.click(screen.getByLabelText("close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders an optional subtitle", () => {
    render(
      <CustomModal open title="T" subtitle="Subtitle text" onClose={vi.fn()}>
        <div />
      </CustomModal>,
    );
    expect(screen.getByText("Subtitle text")).toBeInTheDocument();
  });
});

// ─── Footer ──────────────────────────────────────────────────────────────────

describe("Footer", () => {
  it("renders the author name and Open Library attribution", () => {
    render(<Footer />);
    expect(screen.getByText(/Jaiquez/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Library API/i)).toBeInTheDocument();
  });

  it("renders the current year", () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
