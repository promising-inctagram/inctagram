/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'storage.yandexcloud.net',
        pathname: '/inc-backend/content/**',
        port: '',
        protocol: 'https',
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
