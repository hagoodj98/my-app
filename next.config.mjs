/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This configuration allows Next.js to optimize and serve images from the Open Library Covers API, which is used to display book cover images in the application. By specifying the protocol and hostname, we ensure that Next.js can fetch and optimize these external images properly. Version 13.4 of Next.js introduced the `remotePatterns` configuration, which provides a more flexible way to specify allowed external image sources compared to the previous `domains` configuration. This change allows for more granular control over which external images can be optimized and served by Next.js.
    remotePatterns: [
      {
        protocol: "https", // The Open Library Covers API uses HTTPS to serve book cover images, so we specify "https" as the protocol to ensure that Next.js can fetch these images securely.
        hostname: "covers.openlibrary.org", // This is the hostname for the Open Library Covers API, which is where the book cover images are hosted. By including this hostname in the `remotePatterns`, we allow Next.js to optimize and serve images from this source.
      },
    ],
  },
};

export default nextConfig;
