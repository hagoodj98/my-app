"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "../../styles/home.module.css";
import { Anton, Work_Sans } from "next/font/google";
import Notes from "@/app/components/Notes";
import { useNotes } from "@/app/hooks/useNotes";
import { useEntries } from "@/app/hooks/useEntries";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import CustomButton from "@/app/components/ui/Button";

const antonSC = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const worksans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function EntryID() {
  const { id }: { id: string } = useParams();
  const currentEntry = id;
  const { notes, deleteNoteAPI, addNoteAPI, updateNoteAPI } =
    useNotes(currentEntry);
  const { entries, loading } = useEntries(currentEntry);
  const entry = entries[0];

  // Local loading state for immediate feedback
  const [localLoading, setLocalLoading] = useState(true);

  // Show spinner immediately on mount, then sync with hook loading
  useEffect(() => {
    setLocalLoading(true);
  }, [currentEntry]);

  useEffect(() => {
    if (!loading) {
      setLocalLoading(false);
    }
  }, [loading]);

  if (localLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#3c93a7] border-t-transparent animate-spin" />
          <p className={`text-lg text-gray-500 ${worksans.className}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!entry) return null;

  return (
    <main>
      {/* Header */}

      <div className={styles.header}>
        <h1 className={`text-center ${antonSC.className}`}>AboutThisEntry__</h1>
      </div>

      <div className="container mx-auto px-4">
        {/* Top: image left, data right */}
        <div className="flex flex-col md:flex-row gap-10 py-10">
          {/* Left: cover + rating */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <Image
              src={entry.cover_image_url_large}
              alt={`${entry.title} cover`}
              width={220}
              height={330}
              className="shadow-md rounded"
            />
            <div className={`text-center ${worksans.className}`}>
              <span className="text-3xl font-semibold">
                {Math.round(entry.rating_average * 10) / 10}
              </span>
              <sup>
                {" "}
                /5 <StarIcon className={styles.star} />
              </sup>
              <p className={`text-sm ${styles.ratingcount}`}>
                {entry.rating_count} review/s
              </p>
            </div>
          </div>

          {/* Right: core data */}
          <div className={`flex flex-col gap-3 ${worksans.className}`}>
            <h2
              className={`text-3xl font-bold ${styles.h2} ${antonSC.className}`}
            >
              {entry.title}
            </h2>
            {entry.subtitle && (
              <p className="text-lg text-gray-500 italic">{entry.subtitle}</p>
            )}
            <p>
              <span className="font-semibold">Author(s):</span> {entry.authors}
            </p>
            {entry.publish_date && (
              <p>
                <span className="font-semibold">Published:</span>{" "}
                {entry.publish_date}
              </p>
            )}
            <p>
              <span className="font-semibold">ISBN:</span> {entry.isbn}
            </p>
            <p>
              <span className="font-semibold">Started reading on:</span>{" "}
              <span className={styles.time}>
                {new Date(entry.entry_created).toLocaleDateString()}
              </span>
            </p>
            <div className="mt-2">
              <span className="font-semibold">My Summary:</span>
              <p className="mt-1">{entry.summary}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <Link href="/">
                <CustomButton
                  variant="outlined"
                  color="inherit"
                  style={{ color: "#3c93a7", borderColor: "#3c93a7" }}
                >
                  <span className={worksans.className}>Back To Blog</span>
                </CustomButton>
              </Link>
              <Link
                href={`https://www.amazon.com/dp/${entry.isbn}/?tag=internetarchi-20`}
              >
                <CustomButton
                  variant="outlined"
                  color="inherit"
                  style={{ color: "#3c93a7", borderColor: "#3c93a7" }}
                >
                  <span className={worksans.className}>Amazon</span>
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: subjects + description (full width) */}
        {entry.subjects && (
          <div className={`mb-6 ${worksans.className}`}>
            <h3
              className={`text-xl font-semibold mb-2 ${styles.h2} ${antonSC.className}`}
            >
              Subjects
            </h3>
            <p className="text-gray-600">{entry.subjects}</p>
          </div>
        )}

        {entry.description_summary && (
          <div className={`mb-6 ${worksans.className}`}>
            <h3
              className={`text-xl font-semibold mb-2 ${styles.h2} ${antonSC.className}`}
            >
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {entry.description_summary}
            </p>
          </div>
        )}

        <hr className={styles.hr} />

        {/* Notes */}
        <div className="py-6">
          <h2 className={`${antonSC.className}`}>
            <span className={styles.notes}>My Notes</span>
          </h2>
          <Notes
            notes={notes}
            entry={currentEntry}
            deleteNoteAPI={deleteNoteAPI}
            addNoteAPI={addNoteAPI}
            updateNoteAPI={updateNoteAPI}
          />
        </div>
      </div>
    </main>
  );
}
