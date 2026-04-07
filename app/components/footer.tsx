import { Work_Sans } from "next/font/google";

const worksans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});
const date = new Date();

function Footer() {
  return (
    <div className="container mx-auto px-4">
      <footer className="py-3 my-4">
        <p className="text-center">
          <span className={worksans.className}>
            {" "}
            &copy; Jaiquez&apos;s Blog. All right reversed
          </span>
        </p>
        <p className="text-center text-gray-500">
          <span className={worksans.className}>
            {date.getFullYear()} @ All book information comes from the{" "}
            <a href="https://openlibrary.org/"> Open Library API.</a>
          </span>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
