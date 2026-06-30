/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.ohaus.ru" },
      { protocol: "https", hostname: "ru.ohaus.com" },
    ],
  },
};

export default nextConfig;
