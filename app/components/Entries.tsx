"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./ui/Button";
import { Anton, Work_Sans } from "next/font/google";
import Link from "@mui/material/Link/Link";
import styles from "../styles/home.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import EditSummary from "./EditSummary";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { useEntries } from "../hooks/useEntries";
const worksans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});
const antonSC = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Entries = () => {
  const {
    entries,
    deleteEntry,
    listSortedEntries,
    updateEntrySummary,
    loading,
  } = useEntries();
  // Local loading state for immediate feedback
  const [localLoading, setLocalLoading] = useState(true);
  useEffect(() => {
    setLocalLoading(true);
  }, []);
  useEffect(() => {
    if (!loading) {
      setLocalLoading(false);
    }
  }, [loading]);

  if (localLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#3c93a7] border-t-transparent animate-spin" />
          <p className={`text-lg text-gray-500 ${worksans.className}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.sortnav}>
        <CustomButton
          className={worksans.className}
          onClick={() => listSortedEntries("title")}
          variant="text"
        >
          {" "}
          <span>Title</span>
        </CustomButton>
        <CustomButton
          className={worksans.className}
          onClick={() => listSortedEntries("recency")}
          variant="text"
        >
          <span>Latest</span>
        </CustomButton>
        <CustomButton
          className={worksans.className}
          onClick={() => listSortedEntries("oldest")}
          variant="text"
        >
          {" "}
          <span>Oldest</span>
        </CustomButton>
        <CustomButton
          className={worksans.className}
          onClick={() => listSortedEntries("relevance")}
          variant="text"
        >
          {" "}
          <span>Most Popular</span>
        </CustomButton>
      </div>
      <hr />
      {entries.map((entry, index) => (
        <div key={index}>
          <div className="container mx-auto px-4">
            <div className={styles.entry}>
              <div className="flex justify-start md:justify-end">
                <IconButton
                  onClick={() => entry.id && deleteEntry(entry.id)}
                  className={styles.delete}
                  aria-label="delete"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className={styles.div}>
                  <div className="flex flex-col items-center">
                    <div className={styles.img}>
                      <Image
                        src={entry.cover_image_url_large}
                        alt={entry.title}
                        width={200}
                        height={300}
                      />
                    </div>
                    <div className="mt-3">
                      <h1 className={worksans.className}>
                        {Math.round(entry.rating_average * 10) / 10}
                        <sup>
                          {" "}
                          /5
                          <StarIcon className={styles.star} />
                        </sup>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className={styles.div}>
                  <div className="p-3">
                    <div className={antonSC.className}>
                      <h2 className={styles.h2}>
                        {entry.title} by{" "}
                        {entry.authors.slice(2, entry.authors.length - 2)}
                      </h2>
                    </div>
                    <p className={worksans.className}>
                      {entry.summary}{" "}
                      {entry.id && (
                        <EditSummary
                          id={entry.id}
                          entrySummary={entry.summary}
                          updateEntrySummary={updateEntrySummary}
                        />
                      )}
                    </p>
                    <p className={worksans.className}>
                      Started reading on:{" "}
                      <span className={styles.time}>
                        {new Date(entry.entry_created).toLocaleDateString()}
                      </span>
                    </p>
                    <Link href={`/entry/${entry.id}`} color="inherit">
                      <CustomButton
                        className={styles.readmore}
                        variant="outlined"
                      >
                        <span className={worksans.className}>Read More</span>
                      </CustomButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Entries;
