/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.ohaus.ru" },
      { protocol: "https", hostname: "ru.ohaus.com" },
      { protocol: "https", hostname: "ohaus.ru" },
      { protocol: "https", hostname: "ohaus.com" },
      { protocol: "https", hostname: "www.ohaus.com" },
      { protocol: "https", hostname: "ohaus-cis.ru" },
    ],
  },
};

export default nextConfig;
