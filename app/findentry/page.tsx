"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import styles from "../styles/home.module.css";
import Input from "../components/ui/Input";
import { Work_Sans, Anton } from "next/font/google";
import { EntryInput } from "../components/types";

const antonSC = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const worksans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function TextControlsExample() {
  const router = useRouter();
  const [bookEntry, setBookEntry] = useState<EntryInput>({
    isbn: "",
    summary: "",
  });
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/newentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookEntry),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
        throw new Error("Network response was not ok");
      }

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    if (e.target.value.length < 10) {
      setIsDisabled(true);
      setError("Minium of 10 characters");
    } else {
      setIsDisabled(false);
    }

    setBookEntry((prevBook) => {
      return {
        ...prevBook,
        [name]: value,
      };
    });
    return bookEntry;
  }

  return (
    <main>
      <div className="container mx-auto px-4 flex flex-col">
        <div className={styles.findentrybuttoncontainer}>
          <div className={styles.entrybuttonexit}>
            <Button
              href="/"
              variant="outlined"
              sx={{
                color: "#3c93a7",
                borderColor: "#3c93a7",
                "&:hover": { borderColor: "#beb1a0", color: "#beb1a0" },
              }}
            >
              Back To Blog
            </Button>
          </div>
        </div>

        <div className={styles.addentry}>
          <div className={styles.form}>
            <h2 className="m-2">
              <span className={antonSC.className}>Find Book</span>
            </h2>
            <p className="pb-3">*Minimum 10 Characters for each field*</p>
            <div className={styles.d}>
              <form onSubmit={handleSubmit}>
                <Input
                  name="isbn"
                  onChange={handleChange}
                  fullWidth
                  helperText={error}
                  value={bookEntry.isbn}
                  required
                  id="fullWidth"
                  label="ISBN"
                  variant="outlined"
                />
                <div className="mb-4" />
                <Input
                  multiline
                  name="summary"
                  required
                  fullWidth
                  label="Enter Summary..."
                  onChange={handleChange}
                  value={bookEntry.summary}
                />
                <div className="flex justify-center mt-4">
                  <Button
                    className={worksans.className}
                    disabled={isDisabled}
                    type="submit"
                    variant="outlined"
                    sx={{
                      color: "#3c93a7",
                      borderColor: "#3c93a7",
                      "&:hover": { borderColor: "#beb1a0", color: "#beb1a0" },
                    }}
                  >
                    Add Entry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
// <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Entry does not exist."/>
//  <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Entry already exist."/>
