/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "files.edgestore.dev",
      "source.unsplash.com",
      "unsplash.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
