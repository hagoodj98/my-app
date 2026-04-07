import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import styles from "./styles/home.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Anton } from "next/font/google";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Entries from "./components/Entries";

const antonSC = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Home() {
  return (
    <div>
      <div className={styles.header}>
        <div className={antonSC.className}>
          <h1 className="text-center">
            <AutoStoriesIcon fontSize="large" /> Jaiquez Book Blog
          </h1>
        </div>
      </div>
      <Entries />
      <div className="flex justify-center p-2">
        <Link href="/findentry">
          <Fab
            aria-label="add entry"
            sx={{ backgroundColor: "#3c93a7", color: "#fff", "&:hover": { backgroundColor: "#beb1a0" } }}
          >
            <AddIcon fontSize="large" />
          </Fab>
        </Link>
      </div>
    </div>
  );
}
