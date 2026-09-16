/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      // «Узнать цены» стала «Оставить заявку»; старый адрес мог остаться в ссылках.
      { source: "/quote", destination: "/request", permanent: true },
    ];
  },
};

export default nextConfig;
