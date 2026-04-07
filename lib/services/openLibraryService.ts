import { BookData, OpenLibrary } from "../../app/components/types";
const API_URL = "https://openlibrary.org/api/books?bibkeys=ISBN:";

const getWorkKey = async (
  isbn: string,
): Promise<{ workKey: string; description: string } | null> => {
  const book = await fetch(`https://openlibrary.org/isbn/${isbn}.json`); // Example API call: https://openlibrary.org/isbn/0451526538.json
  //Data structure example: { key: "/books/OL123M", works: [{ key: "/works/OL456W" }] }
  const data = await book.json();
  console.log(data);
  //We go ahead and get the description of the book if the work key exists, as this is a common piece of data that users want to see and it requires an additional API call, so we want to fetch it at the same time as the work key to avoid making multiple API calls later on when we need this data
  const description = data?.description?.value || null;
  const workKey = data?.works?.[0]?.key || null;
  return { workKey, description };
};

const getRatings = async (
  workKey: string | null,
): Promise<{ rating_average: number; rating_count: number }> => {
  if (!workKey) {
    return { rating_average: 0, rating_count: 0 };
  }
  try {
    const rating = await fetch(
      `https://openlibrary.org${workKey}/ratings.json`,
    );
    //Data structure example: { summary: { average: 4.5, count: 100 } }
    const ratingData = await rating.json();
    const rating_average = ratingData?.summary?.average || 0;
    const rating_count = ratingData?.summary?.count || 0;

    return { rating_average, rating_count };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching ratings:", error.message);
    }
    console.error(error);
    return { rating_average: 0, rating_count: 0 };
  }
};
// Note: fetchBookDataByIsbn is currently the only function in this service, but additional functions can be easily added to fetch data by other parameters (e.g. title, author, etc.) if needed in the future
export async function fetchBookDataByIsbn(isbn: string): Promise<BookData> {
  try {
    //GET book data from Open Library API using the provided ISBN
    const response = await fetch(`${API_URL}${isbn}&jscmd=data&format=json`); // Example API call: https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&jscmd=data&format=json
    const data = await response.json(); // The API returns an object where the key is in the format "ISBN:{isbn}", so we need to construct that key to access the book data
    //Example response data structure:
    // {
    //   "ISBN:0451526538": {
    //     "title": "1984",
    //     "subtitle": null,
    //     "publish_date": "1990",
    //     "authors": [
    //       {
    //         "name": "George Orwell"
    //       }
    //     ],
    //     "subjects": [
    //       {
    //         "name": "Dystopian"
    //       },
    //       {
    //         "name": "Political fiction"
    //       }
    //     ],
    //     ...
    //   }
    // }
    const isbnObj = `ISBN:${isbn}`;
    // If the API does not return data for the provided ISBN, we throw an error to be handled by the calling function
    const bookData: OpenLibrary = data?.[isbnObj];

    // We extract the relevant data from the API response, including handling cases where certain fields may be missing or in an unexpected format
    const authors = Array.isArray(bookData.authors)
      ? bookData.authors.map((author: { name: string }) => author.name)
      : ["Not Found"];

    const subjects = Array.isArray(bookData.subjects)
      ? bookData.subjects.map((subject: { name: string }) => subject.name)
      : ["None Found!"];
    // We also fetch the work key and ratings for the book, which require additional API calls, and handle cases where this data may be missing or unavailable

    const workKeyData = await getWorkKey(isbn);
    const workKey = workKeyData?.workKey || null;
    const description = workKeyData?.description || null;

    const { rating_average, rating_count } = await getRatings(workKey || null);

    return {
      title: bookData.title,
      subtitle: bookData.subtitle || null,
      publish_date: bookData.publish_date || null,
      authors,
      subjects,
      rating_average,
      work_key: workKey || null,
      rating_count,
      description_summary: description || null,
      cover_image_url_large: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
      cover_image_url_medium: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
    };
  } catch (error: unknown) {
    console.error(error);

    throw new Error("Entry does not exist, try again");
  }
}
